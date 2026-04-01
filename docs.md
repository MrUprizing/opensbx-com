# Opensbx Documentation Master Copy (for AI Page Generation)

## 1) What Opensbx Is

Opensbx is a self-hosted, API-first sandbox runtime for executing untrusted or AI-generated code in isolated environments.

At a high level, it lets you:

- Create disposable sandboxes (Docker-based)
- Execute commands inside those sandboxes
- Read/write/delete files in sandbox filesystems
- Expose sandbox services through subdomains
- Apply resource and time limits to reduce abuse
- Tear everything down cleanly when work is done

The project is designed for teams that want control over infrastructure, security boundaries, costs, and runtime behavior instead of relying on heavy managed platforms.

## 2) Why Opensbx

Core value proposition:

- **Self-hosted control**: run it on your own servers and network
- **Lightweight architecture**: no Kubernetes control plane required
- **API-first workflows**: easy integration with apps, tools, and agents
- **AI-ready**: built for executing generated scripts/code safely
- **MCP support**: includes a `/v1/mcp` endpoint for MCP clients
- **Low lock-in**: you control images, deployment model, and operations

Typical use cases:

- AI coding agents and tool execution
- Code execution products
- User-submitted script runners
- Disposable CI/test workloads
- Internal prototype/dev environments

## 3) How It Works (Conceptual Flow)

1. Pull or use an existing Docker image (for example `node:22`, `python:3.12`).
2. Create a sandbox with optional ports, timeout, env vars, and resource limits.
3. Run commands and stream logs through API endpoints.
4. Manage files and directories through API endpoints.
5. If ports are exposed, access services through generated subdomain URLs.
6. Stop/delete the sandbox or let timeout auto-stop behavior handle lifecycle.

## 4) Core Runtime and Security Posture

- Sandboxes run isolated from host app context (Docker-based isolation).
- Exposed services are routed through the built-in reverse proxy.
- Optional Bearer API key auth protects endpoints.
- Runtime limits (CPU, memory, timeout) reduce runaway workloads.
- Optional hardened runtime with gVisor (`runsc`) provides stronger isolation.

Important defaults:

- Memory default: **1 GB** (max **8 GB**)
- CPU default: **1.0 vCPU** (max **4.0**)
- Timeout default: **900 seconds** (15 minutes)

## 5) Installation Guide

### 5.1 Prerequisites

- Docker
- Go (latest stable recommended)
- Optional (Ubuntu hardening): gVisor (`runsc`)

### 5.2 Quick Install (Recommended)

Install latest release binary:

```bash
curl -fsSL https://raw.githubusercontent.com/MrUprizing/opensbx/main/scripts/install.sh | bash
```

Run locally:

```bash
opensbx
```

Health check:

```bash
curl http://127.0.0.1:8080/v1/health
```

### 5.3 Docker Setup

macOS:

```bash
docker --version
docker info
```

Ubuntu:

```bash
sudo apt update
sudo apt install -y docker.io
sudo systemctl enable docker
sudo systemctl start docker
docker --version
```

### 5.4 Optional Hardening: gVisor on Ubuntu

Install gVisor:

```bash
curl -fsSL https://gvisor.dev/archive.key | sudo gpg --dearmor -o /usr/share/keyrings/gvisor-archive-keyring.gpg
echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/gvisor-archive-keyring.gpg] https://storage.googleapis.com/gvisor/releases release main" | sudo tee /etc/apt/sources.list.d/gvisor.list > /dev/null
sudo apt update
sudo apt install -y runsc
```

Configure Docker to use `runsc` as default runtime:

```bash
RUNSC_PATH=$(command -v runsc)
sudo mkdir -p /etc/docker
cat <<EOF | sudo tee /etc/docker/daemon.json
{
  "default-runtime": "runsc",
  "runtimes": {
    "runsc": {
      "path": "${RUNSC_PATH}"
    }
  }
}
EOF
sudo systemctl restart docker
```

Validate:

```bash
docker info | grep "Default Runtime"
docker run --rm hello-world
```

## 6) Deployment with Cloudflare Tunnel

Goal in production:

- API at `your-domain.com`
- Sandboxes at `*.your-domain.com`

Cloudflare handles TLS; `cloudflared` forwards traffic to local Opensbx ports.

### 6.1 Fast Setup (macOS)

1) Install cloudflared:

```bash
brew install cloudflared
cloudflared --version
```

2) Authenticate:

```bash
cloudflared tunnel login
```

3) Create tunnel:

```bash
cloudflared tunnel create opensbx-local
```

Use returned `<TUNNEL_ID>` from output.

4) Add DNS routes:

```bash
cloudflared tunnel route dns opensbx-local your-domain.com
cloudflared tunnel route dns opensbx-local '*.your-domain.com'
```

5) Create `~/.cloudflared/config.yml`:

```yaml
tunnel: <TUNNEL_ID>
credentials-file: /Users/<YOUR_USER>/.cloudflared/<TUNNEL_ID>.json

ingress:
  - hostname: your-domain.com
    service: http://127.0.0.1:8080
  - hostname: "*.your-domain.com"
    service: http://127.0.0.1:3000
  - service: http_status:404
```

`ingress` order matters (API first, wildcard second).

6) Validate and run tunnel:

```bash
cloudflared tunnel ingress validate
cloudflared tunnel run opensbx-local
```

### 6.2 Run Opensbx for Deployment

Install binary:

```bash
curl -fsSL https://raw.githubusercontent.com/MrUprizing/opensbx/main/scripts/install.sh | bash
```

Run:

```bash
opensbx -addr :8080 -proxy-addr :3000 -base-domain your-domain.com
```

### 6.3 Verify Deployment

Health check:

```bash
curl https://your-domain.com/v1/health
```

Create sandbox:

```bash
curl -X POST https://your-domain.com/v1/sandboxes \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer your-secret-key" \
  -d '{"image":"nginx:alpine","ports":["80"]}'
```

Expected sandbox URL format:

```text
https://<sandbox-name>.your-domain.com
```

### 6.4 MCP Deployment Check

When running with `-base-domain your-domain.com`, MCP works without `MCPGODEBUG`.

Initialization check:

```bash
curl -i https://your-domain.com/v1/mcp \
  -X POST \
  -H 'Content-Type: application/json' \
  -H 'Accept: application/json, text/event-stream' \
  -d '{"jsonrpc":"2.0","id":1,"method":"initialize","params":{"protocolVersion":"2025-11-25","capabilities":{},"clientInfo":{"name":"curl","version":"1.0"}}}'
```

### 6.5 Ubuntu VPS Notes

Install cloudflared:

```bash
curl -fsSL https://pkg.cloudflare.com/cloudflare-main.gpg | sudo gpg --dearmor -o /usr/share/keyrings/cloudflare-main.gpg
echo 'deb [signed-by=/usr/share/keyrings/cloudflare-main.gpg] https://pkg.cloudflare.com/cloudflared jammy main' | sudo tee /etc/apt/sources.list.d/cloudflared.list
sudo apt update
sudo apt install -y cloudflared
```

Run cloudflared as service:

```bash
sudo cloudflared service install
sudo systemctl enable cloudflared
sudo systemctl restart cloudflared
sudo journalctl -u cloudflared --no-pager -n 50
```

Firewall guidance:

```bash
sudo ufw allow 22/tcp
sudo ufw enable
```

Do not expose ports `8080` or `3000` publicly.

## 7) Reverse Proxy and Subdomain Routing

Opensbx routes sandbox service traffic via subdomains (for example `my-app.localhost`) instead of exposing raw Docker ports externally.

Container ports are bound to `127.0.0.1` only. Traffic should pass through the reverse proxy.

### 7.1 Config Variables

| Env Variable  | Flag           | Default     | Description |
|---------------|----------------|-------------|-------------|
| `PROXY_ADDR`  | `-proxy-addr`  | `:80,:3000` | Comma-separated proxy listen addresses |
| `BASE_DOMAIN` | `-base-domain` | `localhost` | Base domain for subdomain routing |

Behavior note:

- The **first** address in `PROXY_ADDR` is used when generating sandbox URLs.
- If first address is `:80` or `:443`, generated URL omits port.
- Otherwise generated URL includes the port.

### 7.2 Create Sandbox with Proxy URL

Example request:

```bash
curl -X POST localhost:8080/v1/sandboxes \
  -H "Content-Type: application/json" \
  -d '{
    "image": "node:22",
    "ports": ["3000", "8080"]
  }'
```

Example response:

```json
{
  "id": "a1b2c3d4...",
  "name": "eager-turing",
  "ports": ["3000/tcp", "8080/tcp"],
  "url": "http://eager-turing.localhost"
}
```

If sandbox is created without `ports`, proxy URL is omitted.

### 7.3 Local Development Notes

Modern browsers resolve `*.localhost` to `127.0.0.1` (RFC 6761), so custom DNS is usually not needed.

Run default local mode:

```bash
go run ./cmd/api
```

- API: `localhost:8080`
- Proxy: `*.localhost` on port `80` and `3000`

If you cannot bind port 80 without elevated privileges:

```bash
PROXY_ADDR=:3000 go run ./cmd/api
```

If wildcard localhost resolution fails, use dnsmasq:

```bash
brew install dnsmasq
echo "address=/localhost/127.0.0.1" >> $(brew --prefix)/etc/dnsmasq.conf
sudo brew services start dnsmasq
sudo mkdir -p /etc/resolver
echo "nameserver 127.0.0.1" | sudo tee /etc/resolver/localhost
```

### 7.4 Production DNS Pattern

Create wildcard record pointing to your server IP:

```text
*.sandbox.example.com  ->  A  ->  YOUR_SERVER_IP
```

Run example:

```bash
PROXY_ADDR=:80 \
BASE_DOMAIN=sandbox.example.com \
API_KEY=your-secret \
go run ./cmd/api
```

Sandbox URL pattern:

```text
http://<name>.sandbox.example.com
```

HTTPS recommendation: terminate TLS in front of Opensbx proxy using wildcard cert for `*.sandbox.example.com`.

## 8) API Surface (OpenAPI / Swagger Summary)

Base path: `/v1`

### 8.1 Auth Model

- Security definition: `ApiKeyAuth` in `Authorization` header
- Expected format: `Bearer {your-api-key}`
- Health endpoint is typically used for public liveness checks

### 8.2 Endpoint Groups

#### System

- `GET /health` - API + Docker daemon health status

#### Images

- `GET /images` - list local Docker images
- `GET /images/{id}` - inspect image details
- `POST /images/pull` - pull image from registry
- `DELETE /images/{id}?force=true|false` - remove local image

#### Sandboxes

- `GET /sandboxes` - list sandboxes
- `POST /sandboxes` - create sandbox
- `GET /sandboxes/{id}` - inspect sandbox
- `DELETE /sandboxes/{id}` - force delete sandbox
- `POST /sandboxes/{id}/start` - start stopped sandbox
- `POST /sandboxes/{id}/stop` - stop running sandbox
- `POST /sandboxes/{id}/restart` - restart sandbox
- `POST /sandboxes/{id}/pause` - pause sandbox
- `POST /sandboxes/{id}/resume` - resume sandbox
- `POST /sandboxes/{id}/renew-expiration` - reset sandbox timeout/TTL
- `GET /sandboxes/{id}/stats` - CPU/memory/pids snapshot
- `GET /sandboxes/{id}/network` - routing port + container-host map

#### Commands

- `GET /sandboxes/{id}/cmd` - list command executions
- `POST /sandboxes/{id}/cmd` - execute command (async by default)
  - Supports `?wait=true` for blocking/ND-JSON behavior
- `GET /sandboxes/{id}/cmd/{cmdId}` - get command status
  - Supports `?wait=true`
- `POST /sandboxes/{id}/cmd/{cmdId}/kill` - send POSIX signal
- `GET /sandboxes/{id}/cmd/{cmdId}/logs` - get stdout/stderr
  - Supports `?stream=true` for ND-JSON live stream

#### Files

- `GET /sandboxes/{id}/files?path=...` - read file content
- `PUT /sandboxes/{id}/files?path=...` - write/overwrite file content
- `DELETE /sandboxes/{id}/files?path=...` - delete file/dir recursively
- `GET /sandboxes/{id}/files/list?path=...` - list directory (`ls -la` style)

### 8.3 Key Request/Response Models

Common important schemas:

- `CreateSandboxRequest`
  - `image` (required)
  - `ports` (optional; first port used as default proxy target)
  - `timeout` (seconds, default 900 when `0`)
  - `resources` (`memory`, `cpus`)
  - `env` list (`KEY=VALUE` strings)
- `CreateSandboxResponse`
  - `id`, `name`, `ports`, optional `url`
- `ExecCommandRequest`
  - `command` (required), `args`, `cwd`, `env`
- `CommandDetail`
  - command metadata, state, timestamps, exit code
- `CommandLogsResponse`
  - `stdout`, `stderr`, optional final `exit_code`
- `ResourceLimits`
  - `memory` in MB, `cpus` fractional
- `SandboxStats`
  - `cpu_percent`, `memory`, `pids`
- `ErrorResponse`
  - `code`, `message`

### 8.4 Swagger Generation Workflow

Swagger docs are generated from Go annotations using `swag`.

Install generator:

```bash
go install github.com/swaggo/swag/cmd/swag@latest
```

Generate docs:

```bash
swag init -g ./cmd/api/main.go -o docs --parseDependency --parseInternal
```

Manual absolute-path variant:

```bash
/Users/uprizing/go/bin/swag init -g ./cmd/api/main.go -o docs --parseDependency --parseInternal
```

Regenerate every time handler annotations change (`@Summary`, `@Param`, `@Success`, etc.).

Generated artifacts:

- `docs/docs.go`
- `docs/swagger.json`
- `docs/swagger.yaml`

Swagger UI with server running:

```text
http://localhost:8080/swagger/index.html
```

## 9) Testing Guide

### 9.1 Prerequisites

- Go installed
- Docker running (required for integration tests)

### 9.2 Unit Tests

```bash
go test ./...
```

### 9.3 Integration Tests

```bash
go test -tags=integration ./... -run '^TestIntegration'
```

Notes:

- Integration suite uses Docker
- Test image currently hardcoded to `node:25-alpine`
- If image is missing locally, tests try auto-pull
- If Docker is unavailable, integration tests are skipped

### 9.4 CI Behavior

- Unit tests run on pushes to `main`
- Unit tests run on every pull request
- Integration tests run only on pushes to `main`

## 10) Releases and Distribution

Release system uses GitHub Actions + GoReleaser.

### 10.1 Release Pipeline

- Workflow: `.github/workflows/release.yml`
- Trigger: push tags starting with `v` (example: `v1.2.0`)
- Tooling: `goreleaser/goreleaser-action` with `.goreleaser.yml`

Build targets:

- `linux/amd64`, `linux/arm64`
- `macos/amd64`, `macos/arm64`
- `windows/amd64`, `windows/arm64`

Artifacts include archives and `checksums.txt`.

### 10.2 Creating a Release

```bash
git tag v1.0.0
git push origin v1.0.0
```

GitHub Actions creates Release and uploads binaries automatically.

### 10.3 Install Without Cloning

```bash
curl -fsSL https://raw.githubusercontent.com/MrUprizing/opensbx/main/scripts/install.sh | bash
```

Optional env vars for install script:

- `OPENSBX_VERSION` (for example `v1.0.0`)
- `OPENSBX_INSTALL_DIR` (default `/usr/local/bin`)
- `OPENSBX_REPO` (default `MrUprizing/opensbx`)

Pinned version install example:

```bash
OPENSBX_VERSION=v1.0.0 curl -fsSL https://raw.githubusercontent.com/MrUprizing/opensbx/main/scripts/install.sh | bash
```

Windows users can download `.zip` binaries from GitHub Releases.

### 10.4 Local Dry Run (No Publish)

```bash
goreleaser release --snapshot --clean
```

Artifacts are produced in `dist/` only.

## 11) Configuration Reference

| Variable | Flag | Default | Description |
|----------|------|---------|-------------|
| `ADDR` | `-addr` | `:8080` | HTTP API listen address |
| `PROXY_ADDR` | `-proxy-addr` | `:80,:3000` | Proxy listen addresses (comma-separated) |
| `BASE_DOMAIN` | `-base-domain` | `localhost` | Base domain for subdomain routing |
| `LOG_FILE` | `-log-file` | `opensbx.log` | Log file path for API and MCP metadata |
| `API_KEY` | none | empty (auth disabled) | Bearer token for API auth |

## 12) Quick Operational Examples

Run server locally:

```bash
opensbx
```

Create sandbox:

```bash
curl -X POST http://127.0.0.1:8080/v1/sandboxes \
  -H "Content-Type: application/json" \
  -d '{"image":"node:22","ports":["3000"],"timeout":900}'
```

Read health:

```bash
curl http://127.0.0.1:8080/v1/health
```

## 13) Documentation-to-Website Mapping Suggestion

Recommended page structure for docs website generation:

1. **Overview** (what Opensbx is, use cases, architecture)
2. **Installation** (quick start, Docker, gVisor)
3. **Configuration** (flags/env vars and defaults)
4. **Reverse Proxy & Domains** (local + production routing)
5. **Deployment** (Cloudflare Tunnel full flow)
6. **API Reference Overview** (endpoint groups + models)
7. **Swagger/OpenAPI** (generation + UI access)
8. **Testing** (unit, integration, CI behavior)
9. **Releases** (tag flow, binaries, pinned install)
10. **MCP** (endpoint and deployment notes)

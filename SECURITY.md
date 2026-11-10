# Security Policy

## Supported Versions

We actively maintain and provide security patches for the following versions:

| Version | Supported          |
| ------- | ------------------ |
| 1.0.x   | :white_check_mark: |
| < 1.0   | :x:                |

## Reporting a Vulnerability

The Vellora team takes security and user privacy seriously. If you discover a security vulnerability within this project, please follow these guidelines:

1. **Do not create a public GitHub issue.** Public issues disclose vulnerabilities before a patch is ready.
2. Please report any security issues privately via:
   - GitHub Security Advisories: Go to the repository's **Security** tab and click **Report a vulnerability**.
   - Alternatively, email: `security@vellora.app` or contact the repository owner.
3. Include the following details in your report:
   - Description of the vulnerability and its potential impact.
   - Step-by-step reproduction instructions or proof-of-concept code.
   - Any suggested mitigations or patches if available.

### Response Timeline

- **Acknowledgment:** We will acknowledge receipt of your report within 48 hours.
- **Assessment:** We will confirm the vulnerability and provide an estimated resolution time.
- **Resolution:** A patch will be prepared, tested, and released as quickly as possible.

## Security Best Practices for Contributors

- **Never commit secrets:** Never commit API keys, passwords, bearer tokens, or `.env` files into source control.
- **Keep dependencies updated:** Regularly run `npm audit` and keep packages updated.
- **Input Sanitization:** Ensure all external API inputs (e.g., Open Library responses or user-entered text) are handled safely without injecting unsafe scripts into the DOM.

# Environment Setup

## Important: .env File Configuration

The `backend/.env` file contains sensitive credentials and should NOT be committed to version control.

### Setup Instructions:

1. **Copy the example file:**
   ```bash
   cp .env.example .env
   ```

2. **Update the .env file with your actual credentials:**
   - Replace placeholder values with your actual Supabase credentials
   - Generate a secure JWT secret
   - Set your admin credentials
   - Configure your frontend URL

3. **Your actual credentials are backed up in:**
   - `backend/.env.local` (also ignored by git)

### Security Notes:

- The `.env` file is ignored by git (see `.gitignore`)
- Never commit actual credentials to version control
- Use `.env.example` as a template for new environments
- Keep your `.env` file secure and don't share it

### If .env is already tracked by git:

If the .env file was previously committed, remove it from tracking:

```bash
git rm --cached backend/.env
git commit -m "Remove .env from tracking"
```

Then ensure your `.gitignore` includes:
```
.env
.env.*
!.env.example
backend/.env
```
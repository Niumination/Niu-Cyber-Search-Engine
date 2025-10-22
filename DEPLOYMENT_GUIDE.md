# 🚀 Deployment Guide - Cyberpunk Search Engine

## 📋 Prerequisites
- GitHub repository dengan kode aplikasi
- Akun Vercel (gratis)

## 🔧 Environment Variables Setup

### **Di Vercel Dashboard:**

1. **Login ke Vercel** → Pilih project kamu
2. **Go to Settings** → **Environment Variables**
3. **Tambahkan variables berikut:**

```
# Jika diperlukan untuk ZAI SDK
NEXT_PUBLIC_ZAI_API_KEY=your_api_key_here
ZAI_API_KEY=your_api_key_here
```

### **Cara Mendapatkan API Key:**
- Check dokumentasi z-ai-web-dev-sdk
- Hubungi provider ZAI SDK

## 🛠️ Debugging Steps

### **1. Check Vercel Logs**
```bash
# Install Vercel CLI
npm i -g vercel

# View logs
vercel logs
```

### **2. Check Browser Console**
- Buka aplikasi di browser
- Tekan `F12` → Console tab
- Cari error messages dengan emoji 🔍, 📡, ❌, 💥

### **3. Test API Endpoint**
```bash
# Test API directly
curl -X POST https://your-app.vercel.app/api/search \
  -H "Content-Type: application/json" \
  -d '{"query":"test search"}'
```

## 🐛 Common Issues & Solutions

### **Issue: "NO_RESULTS_FOUND_IN_THE_MATRIX"**
**Possible Causes:**
- ❌ ZAI SDK tidak terinstall dengan benar
- ❌ API key missing atau invalid
- ❌ CORS issues
- ❌ Rate limiting

**Solutions:**
1. **Check environment variables** di Vercel
2. **Re-deploy** setelah menambah env vars:
   ```bash
   vercel --prod
   ```
3. **Check API response** di browser console

### **Issue: "SEARCH_ERROR_DETECTED"**
**Possible Causes:**
- ❌ Network connectivity issues
- ❌ API endpoint tidak accessible
- ❌ Server-side errors

**Solutions:**
1. **Check Vercel function logs**
2. **Test API manually** dengan curl
3. **Verify ZAI SDK configuration**

## 🔄 Re-deploy Process

```bash
# Push changes ke GitHub
git add .
git commit -m "Fix search API with better error handling"
git push origin main

# Vercel akan auto-deploy
# Atau manual deploy:
vercel --prod
```

## 📊 Monitoring

### **Vercel Analytics:**
- Dashboard → Analytics tab
- Monitor API calls dan errors

### **Console Logs:**
- Browser console untuk client-side errors
- Vercel logs untuk server-side errors

## 🆘 Troubleshooting Checklist

- [ ] Environment variables ter-setup di Vercel?
- [ ] ZAI SDK compatible dengan Vercel?
- [ ] API routes accessible?
- [ ] CORS configuration benar?
- [ ] Rate limits tidak ter-exceed?

## 🎯 Quick Test

Setelah deploy, test dengan:
1. Buka `https://your-app.vercel.app`
2. Search "test query"
3. Check browser console untuk logs
4. Check hasil search

---

**Need Help?**
- Check Vercel docs: https://vercel.com/docs
- Check browser console untuk detailed errors
- Test API endpoint manually
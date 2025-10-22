# 🚀 Vercel Deployment Guide - Cyberpunk Search Engine

## 📋 API Key Setup

### **API Key Anda:**
```
1d4b30969331418796a424cdfe429c05.TAizXwSJnHBdHcHU
```

---

## 🔧 Setup Environment Variables di Vercel

### **Step 1: Login ke Vercel**
1. Buka [vercel.com](https://vercel.com)
2. Login dengan GitHub kamu
3. Pilih project cyberpunk search engine kamu

### **Step 2: Add Environment Variables**
1. **Settings** → **Environment Variables**
2. **Add New Variable**:

```
Name: ZAI_API_KEY
Value: 1d4b30969331418796a424cdfe429c05.TAizXwSJnHBdHcHU
Environment: ✅ Production ✅ Preview ✅ Development
```

3. **Add Second Variable** (backup):

```
Name: NEXT_PUBLIC_ZAI_API_KEY
Value: 1d4b30969331418796a424cdfe429c05.TAizXwSJnHBdHcHU
Environment: ✅ Production ✅ Preview ✅ Development
```

4. **Save** variables

---

## 🚀 Deploy ke Vercel

### **Method 1: Auto Deploy (Recommended)**
```bash
# Push changes ke GitHub
git add .
git commit -m "Fix API endpoint and add proper error handling"
git push origin main

# Vercel akan auto-deploy
```

### **Method 2: Manual Deploy**
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

---

## 🧪 Test Deployment

### **1. Test API Endpoint:**
```bash
curl -X POST https://your-app.vercel.app/api/search \
  -H "Content-Type: application/json" \
  -d '{"query":"test"}'
```

**Expected Response:**
```json
{
  "success": true,
  "results": [...],
  "query": "test",
  "count": 10
}
```

### **2. Test Frontend:**
1. Buka `https://your-app.vercel.app`
2. Search "cyberpunk"
3. Check console (`F12`) untuk logs

---

## 🐛 Troubleshooting

### **Error 500 / JSON Parsing Error:**

**✅ Solutions:**
1. **Environment Variables** - Pastikan API key sudah ditambah
2. **Re-deploy** setelah menambah env vars
3. **Check Vercel Function Logs**

### **Check Vercel Logs:**
```bash
# Install Vercel CLI
npm i -g vercel

# View logs
vercel logs
```

### **Common Issues:**

| Error | Cause | Solution |
|-------|--------|----------|
| `500 Internal Server Error` | API key missing | Add environment variables |
| `JSON parsing error` | Invalid response | Check API response format |
| `Search timeout` | Slow API response | Check API rate limits |

---

## 📊 Monitoring

### **Vercel Dashboard:**
- **Functions Tab** - Monitor API calls
- **Logs Tab** - Check error messages
- **Analytics Tab** - Track usage

### **Expected Console Logs:**
```
🔍 Search API called
📝 Query received: test
✅ API key found, length: 47
✅ ZAI SDK initialized successfully
🌐 Performing web search for: test
📊 Search completed, validating response...
✅ Valid results: 10 of 10
```

---

## 🎯 Quick Checklist

- [ ] API key ditambah di Vercel Environment Variables?
- [ ] Re-deploy setelah menambah env vars?
- [ ] Test API endpoint dengan curl?
- [ ] Test frontend search functionality?
- [ ] Check console logs untuk debugging?

---

## 🆘 Get Help

### **Debug Commands:**
```bash
# Test API locally
curl -X POST http://localhost:3000/api/search \
  -H "Content-Type: application/json" \
  -d '{"query":"test"}'

# Check Vercel logs
vercel logs --follow

# Re-deploy
vercel --prod
```

### **Expected Results:**
- ✅ API returns 200 OK
- ✅ 10 search results
- ✅ Frontend displays results properly
- ✅ No console errors

---

**🎉 Setelah setup, aplikasi kamu akan bekerja dengan sempurna di Vercel!**
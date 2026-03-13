const https = require('https');

const BACKEND_URL = 'https://powerlink-ezyk.onrender.com';

function testEndpoint(path, description) {
  return new Promise((resolve) => {
    console.log(`\n🧪 Testing: ${description}`);
    console.log(`📍 URL: ${BACKEND_URL}${path}`);
    
    https.get(`${BACKEND_URL}${path}`, (res) => {
      let data = '';
      
      res.on('data', (chunk) => {
        data += chunk;
      });
      
      res.on('end', () => {
        console.log(`✅ Status: ${res.statusCode}`);
        try {
          const json = JSON.parse(data);
          console.log(`📄 Response:`, JSON.stringify(json, null, 2));
        } catch (e) {
          console.log(`📄 Response:`, data);
        }
        resolve();
      });
    }).on('error', (err) => {
      console.log(`❌ Error:`, err.message);
      resolve();
    });
  });
}

async function testBackend() {
  console.log('🚀 Testing PowerLink Backend Deployment');
  console.log('=' .repeat(50));
  
  await testEndpoint('/', 'Root endpoint');
  await testEndpoint('/health', 'Health check');
  await testEndpoint('/api/test', 'Database connection');
  
  console.log('\n' + '='.repeat(50));
  console.log('✨ Backend testing complete!');
  console.log('\n📝 Next steps:');
  console.log('1. If all tests pass, update your frontend VITE_API_URL');
  console.log('2. Redeploy your frontend on Vercel');
  console.log('3. Test end-to-end functionality');
}

testBackend();
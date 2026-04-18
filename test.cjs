const axios = require('axios');
const BASE_URL = 'https://route-posts.routemisr.com';

async function runTest() {
  try {
    const email = `testuser999123123@test.com`;
    // sign in
    const signinRes = await axios.post(`${BASE_URL}/users/signin`, {
      email,
      password: "Password123!"
    }).catch(async (e) => {
       await axios.post(`${BASE_URL}/users/signup`, {
          name: "Test User",
          email: email,
          password: "Password123!",
          rePassword: "Password123!",
          gender: "male",
          dateOfBirth: "1990-01-01"
       });
       return await axios.post(`${BASE_URL}/users/signin`, {email, password:"Password123!"});
    });
    
    // The token is often in signinRes.data.token
    const token = signinRes.data.token;

    // get posts to get a valid post ID
    const postsRes = await axios.get(`${BASE_URL}/posts`, {headers: {token}});
    const postId = postsRes.data.posts[0]._id;
    console.log("Got post id:", postId);

    console.log("\nTesting POST /like...");
    try {
      await axios.post(`${BASE_URL}/posts/${postId}/likes`, {}, { headers: { token } });
      console.log("POST /likes successful");
    } catch (e) {
      console.log("POST /likes failed:", e.response?.status);
    }

    try {
      await axios.post(`${BASE_URL}/posts/${postId}/like`, {}, { headers: { token } });
      console.log("POST /like successful");
    } catch (e) {
      console.log("POST /like failed:", e.response?.status);
    }
    
    console.log("\nTesting PUT /like...");
    try {
      await axios.put(`${BASE_URL}/posts/${postId}/like`, {}, { headers: { token } });
      console.log("PUT /like successful");
    } catch (e) {
      console.log("PUT /like failed:", e.response?.status);
    }

    console.log("\nTesting PATCH /like...");
    try {
      await axios.patch(`${BASE_URL}/posts/${postId}/like`, {}, { headers: { token } });
      console.log("PATCH /like successful");
    } catch (e) {
      console.log("PATCH /like failed:", e.response?.status);
    }

    console.log("\nTesting DELETE /like...");
    try {
      await axios.delete(`${BASE_URL}/posts/${postId}/like`, { headers: { token } });
      console.log("DELETE /like successful");
    } catch (e) {
      console.log("DELETE /like failed:", e.response?.status);
    }

    try {
      await axios.delete(`${BASE_URL}/posts/${postId}/unlike`, { headers: { token } });
      console.log("DELETE /unlike successful");
    } catch (e) {
      console.log("DELETE /unlike failed:", e.response?.status);
    }

    // Is there a toggle? Check likes before and after PATCH
    try {
      const res1 = await axios.get(`${BASE_URL}/posts/${postId}`, { headers: { token } });
      console.log("Likes count before:", res1.data.post.likesCount);
      await axios.patch(`${BASE_URL}/posts/${postId}/like`, {}, { headers: { token } });
      const res2 = await axios.get(`${BASE_URL}/posts/${postId}`, { headers: { token } });
      console.log("Likes count after:", res2.data.post.likesCount);
    } catch(e) {}

  } catch (err) {
    console.error("Test error:", err.response?.data || err.message);
  }
}

runTest();

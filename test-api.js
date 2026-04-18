import axios from "axios";

const BASE_URL = 'https://route-posts.routemisr.com';

async function testApi() {
  const email = `testuser${Date.now()}@test.com`;
  console.log("Signing up...");
  try {
    await axios.post(`${BASE_URL}/users/signup`, {
        name: "Test User",
        email: email,
        password: "Password123!",
        rePassword: "Password123!",
        gender: "male",
        dateOfBirth: "1990-01-01"
    });
  } catch(e) {}

  console.log("Signing in...");
  const signinRes = await axios.post(`${BASE_URL}/users/signin`, {
    email,
    password: "Password123!"
  });
  const token = signinRes.data.token;
  if (!token) throw new Error("No token returned");

  console.log("Getting posts to find a valid post ID...");
  const postsRes = await axios.get(`${BASE_URL}/posts`, {headers: {token}});
  const postId = postsRes.data.posts[0]._id;

  console.log("Test Post ID:", postId);
  
  // Test PATCH
  console.log("Testing PATCH /posts/id/like");
  try {
    const r1 = await axios.patch(`${BASE_URL}/posts/${postId}/like`, {}, {headers: {token}});
    console.log("PATCH Success:", r1.data.message || "OK");
  } catch(e) { console.log("PATCH Failed:", e.response?.status); }

  console.log("Testing PUT /posts/id/like");
  try {
    const r2 = await axios.put(`${BASE_URL}/posts/${postId}/like`, {}, {headers: {token}});
    console.log("PUT Success:", r2.data.message || "OK");
  } catch(e) { console.log("PUT Failed:", e.response?.status); }

  console.log("Testing DELETE /posts/id/like");
  try {
    const r3 = await axios.delete(`${BASE_URL}/posts/${postId}/like`, {headers: {token}});
    console.log("DELETE Success:", r3.data.message || "OK");
  } catch(e) { console.log("DELETE Failed:", e.response?.status); }
}

testApi();

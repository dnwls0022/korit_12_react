// 잘못된 내 코드 앱
// 괄호문제엿음 너무 괄호가 일찍 닫히고 너무 늦게닫히고 그랬음

import './App.css'
import { useQuery,useMutation,QueryClient,QueryClientProvider, useQueryClient } from "@tanstack/react-query";

import { PlusCircle,Loader2,FileText,Send } from "lucide-react";

//get 요청하는 함수 
const getPosts = async ()=> {
  const response = await fetch('http://jsonplaceholder.typicode.com/posts?_limit=10')
  if(!response.ok) throw new Error ('네트워크 응답에 문제 발생')
  return response.json();
  //직렬화해줌
}

// 보내는 post하는 함수
const createPost = async ({title,body})=>{
  const response = await fetch('http://jsonplaceholder.typicode.com/posts',{
    method: 'POST',
    body: JSON.stringify({title,body,userId: 1}),
    headers: { 'Content-Type ': 'application/json; charset=UTF-8'}
  });
  return response.json();
} 
//리액트쿼리 객체생성
const queryClient = new QueryClient();

function PostApp() {
  const client = useQueryClient();

  const {isLoading, error, data:posts} = useQuery({
    queryKey: ['posts'],
    queryFn: getPosts
  });

//
const createMutate = useMutation({
  mutationFn:createPost,
  onSuccess: (newPost)=>{
    client.invalidateQueries(['posts']);
    console.log(`포스트발급완료: ${newPost}`);
  },
});

const handlesubmit = async (e) =>{
  e.preventDefault();
  const formData = new FormData(e.currentTarget);
  const title = formData.get('title');
  const content = formData.get('content');

  if (!title || !content) return;

  //
  createMutate.mutate({ title,body: content});

  //
  e.currentTarget.reset();
};
return(
  <>
  <div>
    <header>
      <h1>
        <FileText/> jsonplacehodler posts
      </h1>
      <p>리액트쿼리 활용데이터 관리예제</p>
    </header>
    {/** post 작성*/}
    <section>
      <form onSubmit={handlesubmit}>
      <div>
        <label htmlFor="">제목</label>
        <input 
          name='title'
          type="text" 
          placeholder='제목입력'
          required
          />
      </div>
        <div>
          <label>내용</label>
          <textarea 
          name="content"
          rows='3'
          placeholder='내용입력'
          required
          ></textarea>
        </div>
        <button
          type='submit'
          disabled = {createMutate.isPending}
        >
          {
            createMutate.isPending ? (
              <Loader2/>
            ) : (
              <Send/>
            )}
            {createMutate.isPending? '전송중...🕛': '포스트작성👍'}
        </button>
      </form>
    </section>

    <section>
      <h2>
        <PlusCircle/>
        Current Posts
      </h2>

      { isLoading ? (
      <div>
        <Loader2/>
        <p>데이터불러오는중...🕛</p>
      </div>
      ) : error?(
        <div>오류발생: {error.message}</div>
      ) : (
        <div>
          {posts.map(post => (
            <div
            key={post.id}
            >
            <span>Post : # {post.id}</span>
            <h3>{post.title}</h3>
            <p>{}</p>    
            </div>
          ))}
        </div>
      )}        
      </section>        
  </div>
  </>
);
}



function App() {
 
  return (
    <QueryClientProvider client={queryClient}>
      <PostApp/>
    </QueryClientProvider>
  )
}

export default App

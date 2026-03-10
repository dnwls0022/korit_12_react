import { useQuery, useMutation, QueryClient, QueryClientProvider, useQueryClient } from "@tanstack/react-query";
import { PlusCircle, Loader2, FileText, Send, AlertCircle } from "lucide-react";

/** * [강의 노트 1] 비유로 이해하는 데이터 통신
 * getPosts: 도서관에서 책(데이터)을 빌려오는 행위
 * createPost: 새 책을 써서 도서관에 기증하는 행위
 */
const getPosts = async () => {
  const response = await fetch('https://jsonplaceholder.typicode.com/posts?_limit=10');
  if (!response.ok) throw new Error('네트워크 응답에 문제가 발생했습니다...⏱️');
  return response.json();
};

const createPost = async ({ title, body }) => {
  const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
    method: 'POST',
    body: JSON.stringify({ title, body, userId: 1 }),
    headers: { 'Content-Type': 'application/json; charset=UTF-8' }
  });
  return response.json();
};

const queryClient = new QueryClient();

function PostApp() {
  const client = useQueryClient();

  const { isLoading, error, data: posts } = useQuery({
    queryKey: ['posts'],
    queryFn: getPosts
  });

  const createMutate = useMutation({
    mutationFn: createPost,
    onSuccess: (newPost) => {
      // [강의 노트 2] invalidateQueries
      // "도서관 게시판이 바뀌었으니, 가지고 있는 정보를 버리고 새로 확인해!"라고 신호를 주는 것
      client.invalidateQueries(['posts']);
      alert(`🎉 포스트가 성공적으로 등록되었습니다! (ID: ${newPost.id})`);
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const title = formData.get('title');
    const content = formData.get('content');

    if (!title || !content) return;
    createMutate.mutate({ title, body: content });
    e.currentTarget.reset();
  };

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <h1 style={styles.title}>
          <FileText size={32} color="#4F46E5" /> JSON Placeholder
        </h1>
        <p style={styles.subtitle}>React Query로 관리하는 스마트한 게시판</p>
      </header>

      {/** Post 작성 Section */}
      <section style={styles.card}>
        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.inputGroup}>
            <label style={styles.label}>제목</label>
            <input 
              name="title"
              style={styles.input}
              placeholder='영감을 주는 제목을 적어주세요'
              required  
            />
          </div>
          <div style={styles.inputGroup}>
            <label style={styles.label}>내용</label>
            <textarea 
              name="content"
              style={styles.textarea}
              placeholder='나누고 싶은 이야기를 적어보세요'
              required
            ></textarea>
          </div>
          <button 
            type='submit'
            style={createMutate.isPending ? {...styles.button, ...styles.buttonDisabled} : styles.button}
            disabled={createMutate.isPending}
          >
            {createMutate.isPending ? (
              <Loader2 className="animate-spin" size={20} />
            ) : (
              <Send size={20} />
            )}
            <span style={{ marginLeft: '8px' }}>
              {createMutate.isPending ? '전송 중...' : '포스트 게시하기'}
            </span>
          </button>
        </form>
      </section>

      {/** 포스트 목록 Section */}
      <section style={styles.listContainer}>
        <h2 style={styles.listTitle}>
          <PlusCircle size={24} color="#10B981" /> 최근 게시물
        </h2>

        {isLoading ? (
          <div style={styles.statusCenter}>
            <Loader2 size={40} color="#4F46E5" className="animate-spin" />
            <p>서버에서 데이터를 가져오고 있어요...</p>
          </div>
        ) : error ? (
          <div style={styles.errorBox}>
            <AlertCircle size={24} />
            <span>오류 발생: {error.message}</span>
          </div>
        ) : (
          <div style={styles.grid}>
            {posts.map(post => (
              <article key={post.id} style={styles.postCard}>
                <div style={styles.postId}># {post.id}</div>
                <h3 style={styles.postTitle}>{post.title}</h3>
                <p style={styles.postBody}>{post.body}</p>
              </article>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

// [강의 노트 3] CSS 인테리어 설계도
const styles = {
  container: {
    maxWidth: '800px',
    margin: '40px auto',
    padding: '0 20px',
    fontFamily: "'Pretendard', sans-serif",
    color: '#334155',
    backgroundColor: '#F8FAFC',
    minHeight: '100vh',
  },
  header: {
    textAlign: 'center',
    marginBottom: '40px',
  },
  title: {
    fontSize: '2.5rem',
    fontWeight: '800',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '12px',
    color: '#1E293B',
  },
  subtitle: {
    color: '#64748B',
    marginTop: '8px',
  },
  card: {
    backgroundColor: '#ffffff',
    padding: '30px',
    borderRadius: '16px',
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
    marginBottom: '40px',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
  },
  inputGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  },
  label: {
    fontWeight: '600',
    fontSize: '0.9rem',
    color: '#475569',
  },
  input: {
    padding: '12px 16px',
    borderRadius: '8px',
    border: '1px solid #E2E8F0',
    fontSize: '1rem',
    outline: 'none',
  },
  textarea: {
    padding: '12px 16px',
    borderRadius: '8px',
    border: '1px solid #E2E8F0',
    fontSize: '1rem',
    minHeight: '100px',
    resize: 'vertical',
  },
  button: {
    backgroundColor: '#4F46E5',
    color: 'white',
    padding: '14px',
    borderRadius: '8px',
    border: 'none',
    fontSize: '1rem',
    fontWeight: '600',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    transition: 'background 0.2s',
  },
  buttonDisabled: {
    backgroundColor: '#94A3B8',
    cursor: 'not-allowed',
  },
  listContainer: {
    marginTop: '50px',
  },
  listTitle: {
    fontSize: '1.5rem',
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    marginBottom: '20px',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
    gap: '20px',
  },
  postCard: {
    backgroundColor: 'white',
    padding: '24px',
    borderRadius: '12px',
    border: '1px solid #E2E8F0',
    transition: 'transform 0.2s',
  },
  postId: {
    fontSize: '0.8rem',
    color: '#94A3B8',
    marginBottom: '8px',
    fontWeight: 'bold',
  },
  postTitle: {
    fontSize: '1.2rem',
    fontWeight: '700',
    marginBottom: '10px',
    color: '#1E293B',
    textTransform: 'capitalize',
  },
  postBody: {
    fontSize: '0.95rem',
    lineHeight: '1.6',
    color: '#475569',
  },
  statusCenter: {
    textAlign: 'center',
    padding: '50px',
    color: '#64748B',
  },
  errorBox: {
    backgroundColor: '#FEF2F2',
    color: '#DC2626',
    padding: '16px',
    borderRadius: '8px',
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
  }
};

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <PostApp />
    </QueryClientProvider>
  )
}

export default App;
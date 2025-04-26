import Layout from "../layout/Layout";
import Feed from "../feed/Feed";

const HomePage = () => {
  return (
    <Layout>
      <div className="w-full h-full min-h-screen">
        <div className="max-w-4xl mx-auto h-full">
          <Feed />
        </div>
      </div>
    </Layout>
  );
};

export default HomePage;

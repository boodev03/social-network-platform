import Layout from "../layout/Layout";
import Feed from "../feed/Feed";

const HomePage = () => {
  return (
    <Layout>
      <div className="w-full h-full bg-gray-50 min-h-screen">
        <div className="max-w-2xl mx-auto h-full">
          <Feed />
        </div>
      </div>
    </Layout>
  );
};

export default HomePage;

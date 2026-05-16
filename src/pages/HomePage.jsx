import Dashboard from '../components/Dashboard';

const HomePage = ({ onNavigate }) => {
  return (
    <div className="w-full">
      <Dashboard onNavigate={onNavigate} />
    </div>
  );
};

export default HomePage;

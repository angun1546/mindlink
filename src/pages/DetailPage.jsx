import Results from '../components/Results';

const DetailPage = ({ onNavigate }) => {
  return (
    <div className="w-full">
      <Results onNavigate={onNavigate} />
    </div>
  );
};

export default DetailPage;

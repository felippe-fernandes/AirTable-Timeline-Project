import Timeline from './components/Timeline';
import timelineItems from './data/timelineItems';

function App() {
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Airtable Timeline ✨
        </h1>
        <p className="text-gray-600 mb-8">
          {timelineItems.length} timeline items to render
        </p>

        <Timeline items={timelineItems} />
      </div>
    </div>
  );
}

export default App;

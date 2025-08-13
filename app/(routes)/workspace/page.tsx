import IntroOptions from "./_components/IntroOptions";
import RecentDesigns from "./_components/RecentDesigns";
import TemplateGrid from "./_components/TemplateGrid";

const WorkSpacePage = () => {
 return (
  <div className="p-6 bg-gray-50 min-h-screen">
   <IntroOptions />
   <TemplateGrid />
   <RecentDesigns />
  </div>
 );
};

export default WorkSpacePage;

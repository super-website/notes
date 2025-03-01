import { BrowserRouter, Route, Routes } from "react-router-dom";
import { HomeLayout, Landing, SinglePage } from "./pages";
import Subjects from "./pages/Subjects";
import SingleSubject from "./pages/SingleSubject";
import Gallery from "./pages/Gallery";
import SingleGallery from "./pages/SingleGallery";
import Error from "./pages/Error";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<HomeLayout />} errorElement={<Error />}>
          <Route index element={<Landing />} />
          <Route path="subjects" element={<Subjects />} />
          <Route path="gallery" element={<Gallery />} />
          <Route path="gallery/:id" element={<SingleGallery />} />
          <Route path="subject/:id" element={<SingleSubject />} />
          <Route path="/singlePage/:id" element={<SinglePage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;

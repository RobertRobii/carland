"use client";

import CareerForm from "../components/CareerForm";
import Copyright from "../components/Copyright";
import SecondaryHeader from "../components/SecondaryHeader";

const Career = () => {
  return (
    <main className="max-w-[1920px] bg-white mx-auto relative overflow-hidden">
      <SecondaryHeader />

      <section className=" bg-white">
        <CareerForm />
        <Copyright />
      </section>
    </main>
  );
};

export default Career;

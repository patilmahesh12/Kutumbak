"use client";

import AddFamilyMemberForm from "@/components/FamilyComponent/AddFamilyMemberForm";
import UpdateFamilyMember from "@/components/FamilyComponent/UpdateFamilyMember";

const FamilyMembersComponent = () => {
  return (
    <>
      <div role="tablist" className="tabs tabs-lifted m-10 text-base">
        <input
          type="radio"
          name="family_member_tabs"
          role="tab"
          className="tab text-lg h-12 mx-10 [--tab-bg:var(--p)] [--tab-border-color:var(--b1)]"
          aria-label="Add Family Member"
          defaultChecked
        />
        <div
          role="tabpanel"
          className="tab-content bg-[--b2] border-[--b1] rounded-box p-6 min-h-96"
        >
          <AddFamilyMemberForm />
        </div>
        <input
          type="radio"
          name="family_member_tabs"
          role="tab"
          className="tab text-lg h-12 mx-10 [--tab-bg:var(--p)] [--tab-border-color:var(--b1)]"
          aria-label="Update Family Member"
        />
        <div
          role="tabpanel"
          className="tab-content bg-[--b2] border-[--b1] rounded-box p-6 min-h-96"
        >
          <UpdateFamilyMember />
        </div>
      </div>
    </>
  );
};

export default FamilyMembersComponent;

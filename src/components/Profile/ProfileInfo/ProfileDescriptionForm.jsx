import React from "react";
import { useForm } from "react-hook-form";
import styles from "./ProfileInfo.module.css";
import { useSelector } from "react-redux";

export const ProfileDescriptionForm = ({
  profile,
  goToEditMode,
  updateUserProfile,
  err,
}) => {
  //const err = useSelector((state) => state.profilePosts.err);
  //console.log(er);
  const { register, handleSubmit } = useForm();
  const onSubmit = (data) => {
    updateUserProfile(data);
    goToEditMode();
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        Full name:{" "}
        <input
          placeholder="Full name"
          {...register("fullName")}
          defaultValue={profile.fullName}
        />
      </div>
      <div>
        about me:{" "}
        <input
          placeholder="aboutMe"
          {...register("aboutMe")}
          defaultValue={profile.aboutMe}
        />
      </div>
      <div>
        Looking for a job:{" "}
        <input type="checkbox" {...register("lookingForAJob")} />
      </div>
      <div>
        Job description:{" "}
        <input
          placeholder="Job description"
          {...register("lookingForAJobDescription")}
          defaultValue={profile.lookingForAJobDescription}
        />
      </div>
      <b>Contacts:</b>
      {Object.keys(profile.contacts).map((key) => {
        return (
          <ContactsForm
            key={key}
            contactTitle={key}
            contactValue={profile.contacts[key]}
            register={register}
          />
        );
      })}

      {err.length > 0 && <div>{err}</div>}
      <input value="save" type="submit" />
    </form>
  );
};

const ContactsForm = ({ contactTitle, register, contactValue }) => {
  return (
    <div className={styles.contact}>
      <b>{contactTitle}</b>:{" "}
      <input
        {...register(`contacts.${contactTitle}`)}
        defaultValue={contactValue}
      />
    </div>
  );
};

export default ProfileDescriptionForm;

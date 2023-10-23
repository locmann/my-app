import React from "react";
import { SubmitHandler, UseFormRegister, useForm } from "react-hook-form";
import styles from "./ProfileInfo.module.css";
import { useSelector } from "react-redux";
import { ContactsType, ProfileType } from "../../types/types";

type PropsType = {
  profile: ProfileType;
  goToEditMode: () => void;
  updateUserProfile: (profile: ProfileType) => void;
  err: string;
};

export const ProfileDescriptionForm: React.FC<PropsType> = ({
  profile,
  goToEditMode,
  updateUserProfile,
  err,
}) => {
  //const err = useSelector((state) => state.profilePosts.err);
  //console.log(er);
  const { register, handleSubmit } = useForm<ProfileType>();
  const onSubmit: SubmitHandler<ProfileType> = (data) => {
    console.log(data);

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
        //console.log(key);

        return (
          <ContactsForm
            key={key}
            contactTitle={key}
            contactValue={profile.contacts[key as keyof ContactsType]}
            register={register}
          />
        );
      })}

      {err.length > 0 && <div>{err}</div>}
      <input value="save" type="submit" />
    </form>
  );
};

type ContactsFormType = {
  contactTitle: string;
  register: any;
  contactValue: string;
};

const ContactsForm: React.FC<ContactsFormType> = ({
  contactTitle,
  register,
  contactValue,
}) => {
  //const { register } = useForm();

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

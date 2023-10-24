import { SubmitHandler, useForm } from "react-hook-form";
import { FilterType } from "../../redux/usersReducer";

type formValues = {
  request: string;
  friend: string;
};

type PropsType = {
  onFilterChanged: (filter: FilterType) => void;
};

const UserSearch: React.FC<PropsType> = (props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<formValues>();
  const onSubmit: SubmitHandler<formValues> = (data) => {
    let friend = null;
    switch (data.friend) {
      case "true": {
        friend = true;
        break;
      }
      case "false": {
        friend = false;
        break;
      }
    }

    let tmp: FilterType = {
      term: data.request,
      friend: friend,
    };
    //debugger;
    props.onFilterChanged(tmp);
    reset();
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input placeholder="Search" {...register("request")} />
      <select {...register("friend")}>
        <option value="null">All</option>
        <option value="true">Followed</option>
        <option value="false">Unfollowed</option>
      </select>
      <input value="Search" type="submit" />
    </form>
  );
};

export default UserSearch;

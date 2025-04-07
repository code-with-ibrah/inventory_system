import DefaultUser from "../assets/icons/account.svg";
import { handleImageLoadError } from "../utils";

function ProfilePhoto({ photo }: { photo: string }) {
  return (
    <img
      src={photo}
      className={
        "h-[100px] w-[100px] md:h-[100px] md:w-[100px]" +
        " rounded-full shadow-3.5xl border-app-red border-2 border-dotted p-1"
      }
      alt="ProfileImage"
      onError={(e) => handleImageLoadError(e, DefaultUser)}
    />
  );
}

export default ProfilePhoto;

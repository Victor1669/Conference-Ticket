import { useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";

import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useRef } from "react";

const schema = yup.object({
  userImage: yup
    .mixed()
    .test("fileExists", "Imagem é obrigatória!", (value) => {
      return value?.length;
    })
    .test("fileType", "Formato não suportado", (value) => {
      if (!value?.[0]) return false;
      return ["image/jpeg", "image/png"].includes(value[0].type);
    })
    .test("fileSize", "Imagem muito grande!", (value) => {
      if (!value?.[0]) return false;
      return value[0].size < 512 * 1024;
    }),
  username: yup.string().required("Nome é obrigatório!"),
  email: yup.string().email("Email inválido!").required("Email é obrigatório!"),
  github: yup.string().required("Nick do GitHub é obrigatório!"),
});

export default function Form({
  onShowTicket,
  imgSrc,
  setImgSrc,
  setName,
  setEmail,
  setGithub,
}) {
  const form = useForm({ resolver: yupResolver(schema) });

  const { register, handleSubmit, formState, setValue, trigger } = form;
  const { errors } = formState;

  function onSubmit(data, e) {
    e.preventDefault();

    onShowTicket(true);
  }

  function handleDrop(e) {
    e.preventDefault?.();

    const file = e.dataTransfer.files[0];

    const fileObj = URL.createObjectURL(file);

    setImgSrc(fileObj);

    setValue("userImage", [file], { shouldValidate: true });
    trigger("userImage");
  }

  function handleDrag(e) {
    e.preventDefault();
  }

  function handleRemoveImage(e) {
    e.stopPropagation();
    setImgSrc(null);

    setValue("userImage", "", { shouldValidate: true });
    trigger("userImage");
  }

  const fileIpt = useRef();

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <Field label="Upload Image" name="userImage" errors={errors.userImage}>
        <label
          htmlFor="userImage"
          onDrop={handleDrop}
          onDragOver={handleDrag}
          className="file inputBackground focusOutline"
        >
          <div className="placeHolderContainer">
            <img
              src={imgSrc || "/images/icon-upload.svg"}
              className="uploadImage"
            />
            {imgSrc === "/images/icon-upload.svg" || !imgSrc ? (
              <span className="uploadMessage">
                Drag and drop or click to upload
              </span>
            ) : (
              ""
            )}
          </div>
        </label>
        <span className="uploadButtons">
          {imgSrc !== "/images/icon-upload.svg" && imgSrc ? (
            <>
              <button
                onClickCapture={handleRemoveImage}
                type="button"
                className="imgButton"
              >
                Remove Image
              </button>
              <button
                onClickCapture={(e) => {
                  e.stopPropagation();
                  fileIpt.current.click();
                }}
                type="button"
                className="imgButton"
              >
                Change Image
              </button>
            </>
          ) : (
            ""
          )}
        </span>

        <input
          {...register("userImage")}
          ref={fileIpt}
          className="fileInput"
          id="userImage"
          type="file"
          accept="image/png, image/jpeg"
          onChange={(e) =>
            handleDrop({ dataTransfer: { files: [e.target.files[0]] } })
          }
        />
      </Field>

      <Field label="Username" name="username" errors={errors.username}>
        <input
          {...register("username")}
          className="inputBackground focusOutline"
          id="username"
          autoComplete="off"
          onChange={(e) => setName(e.target.value)}
        />
      </Field>

      <Field label="Email" name="email" errors={errors.email}>
        <input
          {...register("email")}
          className="inputBackground focusOutline"
          id="email"
          type="email"
          autoComplete="off"
          onChange={(e) => setEmail(e.target.value)}
        />
      </Field>

      <Field label="Github" name="github" errors={errors.github}>
        <input
          {...register("github")}
          className="inputBackground focusOutline"
          id="github"
          autoComplete="off"
          onChange={(e) => setGithub(e.target.value)}
        />
      </Field>

      <button className="submitButton">Generate My Ticket</button>
    </form>
  );
}
function Field({ children, label, name, errors }) {
  return (
    <div className="field">
      <label className="labelText" htmlFor={name}>
        {label}
      </label>
      {children}
      <span className="errorMessage">
        {errors ? (
          <>
            <img src="/images/icon-info.svg" />
            {errors.message}
          </>
        ) : name === "userImage" ? (
          <div className="imageWarning">
            <img width={16} src="/images/icon-info-white.svg" />
            <p>Upload your photo (JPG or PNG, max size: 500kb).</p>
          </div>
        ) : (
          ""
        )}
      </span>
    </div>
  );
}

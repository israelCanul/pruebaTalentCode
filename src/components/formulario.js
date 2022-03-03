import React, { useEffect } from "react";
import { useForm } from "react-hook-form";

import "../scss/formulario.scss";

const Contacto = ({ producto = null, toggleModal = () => {} }) => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();
  useEffect(() => {
    if (producto !== null) {
      setValue("interested", `${producto.Nombre} - ${producto.Modelo}`);
    }
  }, [producto]);

  const onSubmit = (data) => console.log(data);

  return (
    <div className="contacto">
      <div className="background"></div>

      <div className="wrapper">
        <span className="material-icons cerrar" onClick={toggleModal}>
          close
        </span>
        <div className="formulario">
          <h4>Formulario de Informacion</h4>
          <p>Regístrate aquí y recibe toda la información que necesitas</p>
          <form onSubmit={handleSubmit(onSubmit)}>
            {producto ? (
              <div className="formData">
                <label htmlFor="">Producto</label>
                <input
                  type="text"
                  disabled={true}
                  value={`${producto.Nombre} - ${producto.Modelo}`}
                  {...register("interested")}
                />
              </div>
            ) : (
              ""
            )}
            <div className="formData">
              <label htmlFor="">Nombre</label>
              <input type="text" {...register("name", { required: true })} />
              {errors.name && (
                <small className="error">This field is required</small>
              )}
            </div>
            <div className="formData">
              <label htmlFor="">Correo</label>
              <input type="email" {...register("correo", { required: true })} />
              {errors.correo && (
                <small className="error">This field is required</small>
              )}
            </div>
            <div className="formData">
              <label htmlFor="">Telefono</label>
              <input
                type="phone"
                {...register("telefono", { required: true })}
              />
              {errors.telefono && (
                <small className="error">This field is required</small>
              )}
            </div>
            <div className="formData">
              <label htmlFor="">Asunto</label>
              <textarea {...register("asunto", { required: true })} />
              {errors.asunto && (
                <small className="error">This field is required</small>
              )}
            </div>
            <div className="formData">
              <input type="submit" />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contacto;

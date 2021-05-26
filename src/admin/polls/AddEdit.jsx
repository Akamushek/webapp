import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

import { pollService } from "@/_services";

function AddEdit({ history, match }) {
  const { id } = match.params;
  const isAddMode = !id;

  const initialValues = {
    title: "",
    question: "",
    option1: "",
    option2: "",
  };

  const validationSchema = Yup.object().shape({
    title: Yup.string().required("Title is required"),
    question: Yup.string().required("Question is required"),
    option1: Yup.string().required("Option 1 Name is required"),
    option2: Yup.string().required("Option 2 is required"),
  });

  function onSubmit(fields, { setStatus, setSubmitting }) {
    setStatus();
    if (isAddMode) {
      createpoll(fields, setSubmitting);
    } else {
      updatepoll(id, fields, setSubmitting);
    }
  }

  function createpoll(fields, setSubmitting) {
    pollService
      .create(fields)
      .then(() => {
        alertService.success("poll added successfully", {
          keepAfterRouteChange: true,
        });
        history.push(".");
      })
      .catch((error) => {
        setSubmitting(false);
        alertService.error(error);
      });
  }

  function updatepoll(id, fields, setSubmitting) {
    pollService
      .update(id, fields)
      .then(() => {
        alertService.success("Update successful", {
          keepAfterRouteChange: true,
        });
        history.push("..");
      })
      .catch((error) => {
        setSubmitting(false);
        alertService.error(error);
      });
  }

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {({ errors, touched, isSubmitting, setFieldValue }) => {
        useEffect(() => {
          if (!isAddMode) {
            // get poll and set form fields
            pollService.getById(id).then((poll) => {
              const fields = ["title", "question", "option1", "opion2"];
              fields.forEach((field) =>
                setFieldValue(field, poll[field], false)
              );
            });
          }
        }, []);

        return (
          <Form>
            <h1>{isAddMode ? "Add poll" : "Edit poll"}</h1>
            <div className="form-row">
              <div className="form-group col">
                <label>Заглавие</label>
                <Field
                  name="title"
                  type="text"
                  className={
                    "form-control" +
                    (errors.title && touched.title ? " is-invalid" : "")
                  }
                ></Field>
                <ErrorMessage
                  name="title"
                  component="div"
                  className="invalid-feedback"
                />
              </div>
              <div className="form-group col-5">
                <label>Вопрос</label>
                <Field
                  name="question"
                  type="text"
                  className={
                    "form-control" +
                    (errors.question && touched.question ? " is-invalid" : "")
                  }
                />
                <ErrorMessage
                  name="question"
                  component="div"
                  className="invalid-feedback"
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group col-7">
                <label>Вариант 1</label>
                <Field
                  name="option1"
                  type="text"
                  className={
                    "form-control" +
                    (errors.option1 && touched.option1 ? " is-invalid" : "")
                  }
                />
                <ErrorMessage
                  name="option1"
                  component="div"
                  className="invalid-feedback"
                />
              </div>
              <div className="form-group col-7">
                <label>Вариант 2</label>
                <Field
                  name="option2"
                  type="text"
                  className={
                    "form-control" +
                    (errors.option2 && touched.option2 ? " is-invalid" : "")
                  }
                />
                <ErrorMessage
                  name="option2"
                  component="div"
                  className="invalid-feedback"
                />
              </div>
            </div>
            <div className="form-group">
              <button
                type="submit"
                disabled={isSubmitting}
                className="btn btn-primary"
              >
                {isSubmitting && (
                  <span className="spinner-border spinner-border-sm mr-1"></span>
                )}
                Сохранить
              </button>
              <Link to={isAddMode ? "." : ".."} className="btn btn-link">
                Отменить
              </Link>
            </div>
          </Form>
        );
      }}
    </Formik>
  );
}

export { AddEdit };

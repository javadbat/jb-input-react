import { JBInputWebComponent, ValidationItem } from "jb-input";
import { ValidationValue } from "jb-input/types";
import { RefObject, useEffect } from "react";

export type JBInputAttributes = {
    message?: string,
    value?: string | number | null | undefined,
    validationList?: ValidationItem<ValidationValue>[],
    type?: string,
    placeholder?: string,
    disabled?: boolean,
    inputmode?: string,
    label?: string,
    name?: string,
}
export function useJBInputAttribute(element: RefObject<JBInputWebComponent>, props: JBInputAttributes) {
  useEffect(() => {
    let value = props.value;
    if (props.value == null || props.value === undefined) {
      value = '';
    }
    if (element && element.current && element.current) {
      element.current.value = value?.toString() || "";
    }
  }, [props.value]);
  useEffect(() => {
    if (props.type) {
      element?.current?.setAttribute('type', props.type);
    }
  }, [props.type]);
  useEffect(() => {
    if (element && element.current) {
      element.current.validation.list = props.validationList || [];
    }
  }, [props.validationList]);
  useEffect(() => {
    element?.current?.setAttribute('label', props.label || "");
  }, [props.label]);
  useEffect(() => {
    if (typeof props.disabled == "boolean") {
      element?.current?.setAttribute('disabled', `${props.disabled}`);
    }
  }, [props.disabled]);
  useEffect(() => {
    if (props.inputmode) {
      element.current?.setAttribute('inputmode', props.inputmode);
    } else {
      element.current?.removeAttribute('inputmode');
    }
  }
  , [props.inputmode]);
  useEffect(() => {
    element?.current?.setAttribute('message', props.message || "");
  }, [props.message]);
  useEffect(() => {
    element?.current?.setAttribute('placeholder', props.placeholder || "");
  }, [props.placeholder]);
}
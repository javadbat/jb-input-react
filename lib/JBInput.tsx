import React ,{ useRef, useEffect, useImperativeHandle, useState, useCallback, DetailedHTMLProps, HTMLAttributes,forwardRef } from 'react';
import 'jb-input';
import { useEvent } from '../../../common/hooks/use-event';
import {type ValidationItem} from '../../../common/scripts/validation/validation-helper-types';
// eslint-disable-next-line no-duplicate-imports
import { JBInputWebComponent } from 'jb-input';
import {ValidationValue, type NumberFieldParameterInput } from 'jb-input/lib/types';
declare global {
    // eslint-disable-next-line @typescript-eslint/no-namespace
    namespace JSX {
        interface IntrinsicElements {
            'jb-input': JBInputType;
        }
        interface JBInputType extends DetailedHTMLProps<HTMLAttributes<JBInputWebComponent>, JBInputWebComponent> {
            class?: string,
            label?: string,
            name?: string,
            message?: string,
            placeholder?:string,
            // ref:React.RefObject<JBDateInputWebComponent>,
        }
    }
}
// eslint-disable-next-line react/display-name
export const JBInput = forwardRef((props: JBInputProps, ref) => {
  const element = useRef<JBInputWebComponent>(null);
  const [refChangeCount, refChangeCountSetter] = useState(0);
  useImperativeHandle(
    ref,
    () => (element ? element.current : {}),
    [element],
  );
  //to force rerender for events
  useEffect(() => {
    refChangeCountSetter(refChangeCount + 1);
  }, [element.current]);
  const onChange = useCallback((e: JBInputEventType<Event>) => {
    if (typeof props.onChange === "function") {
      props.onChange(e);
    }
  }, [props.onChange]);
  const onKeydown = useCallback((e:JBInputEventType<KeyboardEvent>) => {
    if (typeof props.onKeydown === "function") {
      props.onKeydown(e);
    }
  }, [props.onKeydown]);
  const onKeyup = useCallback((e:JBInputEventType<KeyboardEvent>) => {
    if (typeof props.onKeyup === "function") {
      props.onKeyup(e);
    }
  }, [props.onKeyup]);

  const onEnter = useCallback((e:JBInputEventType<CustomEvent>) => {
    if (props.onEnter) {
      props.onEnter(e);
    }
  }, [props.onEnter]);
  const onFocus = useCallback((e: JBInputEventType<FocusEvent>) => {
    if (props.onFocus && e instanceof FocusEvent) {
      props.onFocus(e);
    }
  }, [props.onFocus]);
  const onBlur = useCallback((e: JBInputEventType<FocusEvent>) => {
    if (props.onBlur && e instanceof FocusEvent) {
      props.onBlur(e);
    }
  }, [props.onBlur]);
  const onInput = useCallback((e: JBInputEventType<InputEvent>) => {
    if (typeof props.onInput == 'function' && e instanceof InputEvent) {
      props.onInput(e);
    }
  }, [props.onInput]);
  const onBeforeInput = useCallback((e: JBInputEventType<InputEvent>) => {
    if (typeof props.onBeforeinput == 'function' && e instanceof InputEvent) {
      props.onBeforeinput(e);
    }
  }, [props.onBeforeinput]);
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
    if (typeof props.numberFieldParameter == "object") {
      element?.current?.setNumberFieldParameter(props.numberFieldParameter);
    }
  }, [props.numberFieldParameter]);
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
  useEvent(element.current, 'change', onChange);
  useEvent(element.current, 'keydown', onKeydown);
  useEvent(element.current, 'keyup', onKeyup);
  useEvent(element.current, 'focus', onFocus);
  useEvent(element.current, 'blur', onBlur);
  useEvent(element.current, 'enter', onEnter);
  useEvent(element.current, 'input', onInput);
  useEvent(element.current, 'beforeinput', onBeforeInput);
  return (
    <jb-input placeholder={props.placeholder} ref={element} class={props.className} label={props.label} message={props.message}>
      {props.children}
    </jb-input>
  );
});
export type JBInputEventType<T> = T & {
    target: JBInputWebComponent
}
export type JBInputProps = {
    label?: string,
    name?: string,
    className?: string,
    message?: string,
    value: string | number | null | undefined,
    validationList?: ValidationItem<ValidationValue>[],
    // usePersianNumber?: boolean,
    type?: string,
    onEnter?: (e: JBInputEventType<CustomEvent>) => void,
    onInput?: (e: JBInputEventType<InputEvent>) => void,
    onBeforeinput?: (e: JBInputEventType<InputEvent>) => void,
    onFocus?: (e: JBInputEventType<FocusEvent>) => void,
    onBlur?: (e: JBInputEventType<FocusEvent>) => void,
    onKeyup?: (e: JBInputEventType<KeyboardEvent>) => void,
    onKeydown?: (e: JBInputEventType<KeyboardEvent>) => void,
    onChange?: (e: JBInputEventType<Event>) => void,
    placeholder?: string,
    numberFieldParameter?: NumberFieldParameterInput,
    disabled?: boolean,
    inputmode?: string,
    children?: React.ReactNode | React.ReactNode[],
}
JBInput.displayName = "JBInput";


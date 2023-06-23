import React, { useRef, useEffect, useImperativeHandle, useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import 'jb-input';
import { useEvent } from '../../custom-hooks/UseEvent';
import { JBInputValidationItem, NumberFieldParameterInput } from 'jb-input/dist/Types';
// eslint-disable-next-line no-duplicate-imports
import { JBInputWebComponent } from 'jb-input';
declare global {
    // eslint-disable-next-line @typescript-eslint/no-namespace
    namespace JSX {
      interface IntrinsicElements {
        'jb-input': JBInputType;
      }
      interface JBInputType extends React.DetailedHTMLProps<React.HTMLAttributes<JBInputWebComponent>, JBInputWebComponent> {
        class?:string,
        label?: string,
        name?:string,
        message?:string,
        // ref:React.RefObject<JBDateInputWebComponent>,
      }
    }
}
// eslint-disable-next-line react/display-name
export const JBInput = React.forwardRef((props:JBInputProps, ref) => {
    /**
     * @type {React.MutableRefObject<HTMLInputElement>}
     */
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
    const onChange = useCallback((e)=>{
        if (typeof props.onChange === "function") {
            props.onChange(e);
        }
    },[props.onChange]);
    const onKeydown = useCallback((e)=>{
        if (typeof props.onKeydown === "function") {
            props.onKeydown(e);
        }
    },[props.onKeydown]);
    const onKeyup = useCallback((e)=>{
        if (typeof props.onKeyup === "function") {
            props.onKeyup(e);
        }
    },[props.onKeyup]);
    
    const onEnter = useCallback((e)=>{
        if (props.onEnter) {
            props.onEnter(e);
        }
    },[props.onEnter]);
    const onFocus = useCallback((e)=>{
        if (props.onFocus && e instanceof FocusEvent) {
            props.onFocus(e);
        }
    },[props.onFocus]);
    const onBlur = useCallback((e)=>{
        if (props.onBlur && e instanceof FocusEvent) {
            props.onBlur(e);
        }
    },[props.onBlur]);
    const onInput = useCallback((e)=>{
        if (typeof props.onInput == 'function' && e instanceof InputEvent) {
            props.onInput(e);
        }
    },[props.onInput]);
    const onBeforeInput = useCallback((e)=>{
        if (typeof props.onBeforeinput == 'function' && e instanceof InputEvent) {
            props.onBeforeinput(e);
        }
    },[props.onBeforeinput]);
    useEffect(() => {
        let value = props.value;
        if (props.value == null || props.value === undefined) {
            value = '';
        }
        if(element && element.current && element.current.value){
            element.current.value = value?.toString() || "";
        }
    }, [props.value]);
    useEffect(() => {
        if(props.type){
            element?.current?.setAttribute('type', props.type);
        }
    }, [props.type]);
    useEffect(() => {
        if(element && element.current){
            element.current.validationList = props.validationList || [];
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
        if(props.inputmode){
            element.current?.setAttribute('inputmode',props.inputmode);
        }else{
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
export type JBInputProps = {
    label?: string,
    name?:string,
    className?:string,
    message?:string,
    value?: string | number,
    validationList?: JBInputValidationItem[],
    // usePersianNumber?: boolean,
    type?: string,
    onEnter?: (e:CustomEvent)=>void,
    onInput?: (e:InputEvent)=>void,
    onBeforeinput?:(e:InputEvent)=>void,
    onFocus?: (e:FocusEvent)=>void,
    onBlur?: (e:FocusEvent)=>void,
    onKeyup?: (e:KeyboardEvent)=>void,
    onKeydown?: (e:KeyboardEvent)=>void,
    onChange?: (e:Event)=>void,
    placeholder?: string,
    numberFieldParameter?: NumberFieldParameterInput,
    disabled?: boolean,
    inputmode?: string,
    children?:any,
}
JBInput.propTypes = {
    label: PropTypes.string,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    type: PropTypes.string,
    message:PropTypes.string,
    onChange: PropTypes.func,
    onKeyup: PropTypes.func,
    onEnter: PropTypes.func,
    onInput: PropTypes.func,
    onFocus: PropTypes.func,
    onBlur: PropTypes.func,
    onBeforeinput: PropTypes.func,
    className: PropTypes.string,
    validationList: PropTypes.array,
    placeholder: PropTypes.string,
    numberFieldParameter: PropTypes.object,
    disabled: PropTypes.bool,
    inputmode: PropTypes.string,
};
JBInput.displayName = "JBInput";

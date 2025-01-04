import {
    ButtonItem,
    PanelSection,
    PanelSectionRow,
    DropdownItem,
    SliderField,
    Focusable,
    DialogButton,
    showModal} from "@decky/ui";
import { useEffect } from "react";

import { Position, ViewMode } from "./util";
import { useGlobalState } from "./globalState";
import { UrlModalWithState } from "./urlModal";

export const Settings = () => {
    const [{ viewMode, position, margin, size }, setGlobalState, stateContext] = useGlobalState();

    useEffect(() => {
        setGlobalState(state => ({
            ...state,
            visible: true,
            viewMode: ViewMode.Picture
        }));
    }, []);

    const options = [
        { label: 'Top', data: Position.Top },
        { label: 'Top Right', data: Position.TopRight },
        { label: 'Right', data: Position.Right },
        { label: 'Bottom Right', data: Position.BottomRight },
        { label: 'Bottom', data: Position.Bottom },
        { label: 'Bottom Left', data: Position.BottomLeft },
        { label: 'Left', data: Position.Left },
        { label: 'Top Left', data: Position.TopLeft },
    ];

    return <>
        <PanelSection>
            <PanelSectionRow>
                <DropdownItem
                    label='Position'
                    selectedOption={position}
                    rgOptions={options}
                    onMenuOpened={() =>
                        setGlobalState(state => ({
                            ...state,
                            visible: false
                        }))}
                    onChange={option =>
                        setGlobalState(state => ({
                            ...state,
                            visible: true,
                            position: option.data,
                            viewMode: ViewMode.Picture
                        }))} />
            </PanelSectionRow>
            <PanelSectionRow>
                <SliderField
                    label='Size'
                    value={size}
                    onChange={size =>
                        setGlobalState(state => ({
                            ...state,
                            size,
                            visible: true,
                            viewMode: ViewMode.Picture
                        }))}
                    min={0.70}
                    max={1.30}
                    step={0.15}
                    notchCount={3}
                    notchTicksVisible={true}
                    notchLabels={[
                        { label: "S", notchIndex: 0, value: 0.70 },
                        { label: "M", notchIndex: 1, value: 1 },
                        { label: "L", notchIndex: 2, value: 1.30 }
                    ]} />
            </PanelSectionRow>
            <PanelSectionRow>
                <SliderField
                    label='Margin'
                    value={margin}
                    onChange={margin =>
                        setGlobalState(state => ({
                            ...state,
                            margin,
                            visible: true,
                            viewMode: ViewMode.Picture
                        }))}
                    min={0}
                    max={60}
                    step={15}
                    notchCount={3}
                    notchTicksVisible={true}
                    notchLabels={[
                        { label: "S", notchIndex: 0, value: 0 },
                        { label: "M", notchIndex: 1, value: 30 },
                        { label: "L", notchIndex: 2, value: 60 },
                    ]} />
            </PanelSectionRow>
            <PanelSectionRow>
                <ButtonItem
                    layout="below"
                    onClick={() => showModal(<UrlModalWithState value={stateContext} />)}>
                    URL
                </ButtonItem>
            </PanelSectionRow>
            <PanelSectionRow>
                <Focusable style={{ display: "flex" }}>
                    {viewMode != ViewMode.Expand &&
                        <DialogButton
                            style={{ flex: 1, minWidth: 0 }}
                            onClick={() =>
                                setGlobalState(state => ({
                                    ...state,
                                    visible: true,
                                    viewMode: ViewMode.Expand
                                }))}>
                            Expand
                        </DialogButton>}
                    {viewMode == ViewMode.Expand &&
                        <DialogButton
                            style={{ flex: 1, minWidth: 0 }}
                            onClick={() =>
                                setGlobalState(state => ({
                                    ...state,
                                    visible: true,
                                    viewMode: ViewMode.Picture
                                }))}>
                            Picture
                        </DialogButton>}
                    &nbsp;&nbsp;
                    <DialogButton
                        style={{ flex: 1, minWidth: 0 }}
                        onClick={() =>
                            setGlobalState(state => ({
                                ...state,
                                viewMode: ViewMode.Closed
                            }))}>
                        Close
                    </DialogButton>
                </Focusable>
            </PanelSectionRow>
        </PanelSection>
    </>;
};
import * as React from "react"

import {
    type ILSystemRules,
    type ILSystemTurtleActions,
    type ILSystemWord,
} from "../../lib"

import AlphabetInspector from "./alphabet"
import RulesInspector from "./rules"
import ActionsInspector from "./actions"
import GeneratorInspector from "./generator"
import ColorsInpector from "./colors"

type InspectorProps = {
    axiom: ILSystemWord,
    onAxiomChange: (axiom: ILSystemWord) => void

    rules: Partial<ILSystemRules>
    onRulesChange: (rules: ILSystemRules) => void

    actions: Partial<ILSystemTurtleActions>
    onActionsChange: (actions: ILSystemTurtleActions) => void

    step: number
    onStepChange: (step: number) => void

    backgroundColor: string
    onBackgroundColorChange: (backgroundColor: string) => void

    color: string,
    onColorChange: (color: string) => void
}

const Inspector = ({
    axiom, onAxiomChange,
    rules, onRulesChange,
    actions, onActionsChange,
    step, onStepChange,
    backgroundColor, onBackgroundColorChange,
    color, onColorChange,
}: InspectorProps) => {
    const [alphabet, setAlphabet] = React.useState<ILSystemWord>([
        ...new Set(Object.keys(rules))
    ] as ILSystemWord)
    return <form
        autoComplete="off"
        autoCorrect="off"
        autoCapitalize="off"
        spellCheck="false"
        id="l-system-inspector"
    >
        <AlphabetInspector onAlphabetChange={ setAlphabet } />
        <RulesInspector
            alphabet={ alphabet }
            rules={ rules }
            onRulesChange={ onRulesChange }
        />
        <ActionsInspector
            alphabet={ alphabet }
            actions={ actions }
            onActionsChange={ onActionsChange }
        />
        <GeneratorInspector
            alphabet={ alphabet }
            axiom={ axiom }
            onAxiomChange={ onAxiomChange }
            steps={ step }
            maxSteps={ 16 }
            onStepsChange={ onStepChange }
        />
        <ColorsInpector
            background={ backgroundColor }
            onBackgroundChange={ onBackgroundColorChange }
            stroke={ color }
            onStrokeChange={ onColorChange }
        />
    </form>
}

export default Inspector
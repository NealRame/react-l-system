import * as React from "react"

import {
    type ILSystemSymbols,
    type ILSystemTurtleActions,
    type ILSystemRules,
    type ILSystemWord,
    useLSystem,
} from "../../lib"

interface ICanvasSystemProps<Alphabet extends ILSystemSymbols> {
    axiom: ILSystemWord<Alphabet>
    rules: ILSystemRules<Alphabet>
    actions: ILSystemTurtleActions<Alphabet>
    steps: number
    backgroundColor?: string
    strokeColor?: string
    strokeThickness?: number
    padding?: number
}

function CanvasLSystem<Alphabet extends ILSystemSymbols>(
    props: ICanvasSystemProps<Alphabet>,
) {
    const {
        backgroundColor,
        strokeColor,
        strokeThickness,
        axiom,
        rules,
        actions,
        steps,
        padding,
    } = {
        backgroundColor: "white",
        strokeColor: "black",
        strokeThickness: 0.1,
        padding: 0,
        ...props
    }

    const canvasEl = React.useRef<HTMLCanvasElement>(null)
    const { path, rect } = useLSystem(rules, actions, axiom, steps)
    const [ width, setWidth ] = React.useState(0)
    const [ height, setHeight ] = React.useState(0)

    const resize = () => {
        const canvas = canvasEl.current
        if (canvas) {
            setWidth(canvas.clientWidth)
            setHeight(canvas.clientHeight)
        }
    }

    React.useEffect(() => {
        resize()
        window.addEventListener("resize", resize)
        return () => window.removeEventListener("resize", resize)
    })

    React.useEffect(() => {
        if (canvasEl.current) {
            const canvas = canvasEl.current

            canvas.width = width
            canvas.height = height

            const ctx = canvas.getContext("2d")
            if (ctx) {
                ctx.fillStyle = backgroundColor
                ctx.fillRect(0, 0, canvas.width, canvas.height)
                ctx.translate(padding/2, padding/2)

                const vw = Math.max(canvas.width - padding)
                const vh = Math.max(canvas.height - padding)
                const f = Math.min(
                    vw/Math.max(1, rect.w),
                    vh/Math.max(1, rect.h),
                )
                
                ctx.translate(
                    vw/2 - (rect.x + rect.w/2)*f,
                    vh/2 - (rect.y + rect.h/2)*f,
                )
                ctx.scale(f, f)
                ctx.strokeStyle = strokeColor
                ctx.lineWidth = strokeThickness/f
                ctx.stroke(new Path2D(path))
            }
        }
    })

    return <canvas id="l-system-renderer" ref={canvasEl}/>
}

export default CanvasLSystem
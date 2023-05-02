import { Ref, useEffect, useMemo, useRef } from "preact/hooks"
import petal from "../assets/sakura.png"

const limit = (n: number) => Math.min(0.1, Math.max(0.05, n))

export interface Sakura {
	start: (target: Ref<HTMLElement>) => void
	stop: () => void
}

interface Props {
	canvas: Ref<HTMLCanvasElement>
}

export const useSakura = ({ canvas }: Props): Sakura => {
	const percentX = useRef(0)
	const percentY = useRef(0)
	useEffect(() => {
		const onMouseMove = (e: MouseEvent) => {
			const { top, bottom, left, right, width, height } = canvas.current!.getBoundingClientRect()
			if (e.clientX < left || e.clientX > right || e.clientY < top || e.clientY > bottom) return

			percentX.current = (e.clientX - left) / width
			percentY.current = (e.clientY - top) / height
		}

		window.addEventListener("mousemove", onMouseMove)
		window.addEventListener("scroll", overlay)
		return () => {
			window.removeEventListener("mousemove", onMouseMove)
			window.removeEventListener("scroll", overlay)
		}
	}, [canvas])

	const image = useMemo(() =>
		Object.assign(new Image(), { src: petal })
	, [])
	const blossom = useMemo(() => {
		const rotate = Math.random()
		return Array.from({ length: 10 }).map(() => ({
			x      : Math.random(),
			y      : Math.random(),
			w      : Math.random() * 10 + 5,
			h      : Math.random() * 10 + 10,
			cos    : Math.cos(rotate),
			sin    : Math.sin(rotate),
			speedX : Math.random() * 0.01 + 0.02,
			speedY : Math.random() * 0.01 + 0.02,
			opacity: Math.random(),
		}))
	}, [])

	const target = useRef<HTMLElement | null>()
	const draw = () => {
		const { width, height } = canvas.current!
		const ctx = canvas.current!.getContext("2d")!
		ctx.clearRect(0, 0, width, height)

		for (const b of blossom) {
			if (b.x > 1) {
				b.x = 0
			} else if (b.x < 0) {
				b.x = 1
			}
			if (b.y > 1 || b.y < 0) {
				b.y = 0
			}

			if (percentX.current > 0.5) {
				b.x += b.speedX * limit(percentX.current - 0.5)
			} else {
				b.x -= b.speedX * limit(0.5 - percentX.current)
			}
			b.y += b.speedY * limit(percentY.current)

			ctx.globalAlpha = b.opacity
			ctx.setTransform(b.cos, b.sin, -b.sin, b.cos, b.x * width, b.y * height)
			ctx.drawImage(image, 0, 0, b.w, b.h)
			ctx.setTransform(1, 0, 0, 1, 0, 0)
		}
		if (target.current) {
			requestAnimationFrame(draw)
		}
	}

	const start = (ref: Ref<HTMLElement>) => {
		if (target.current) return
		target.current = ref.current

		overlay()
		if (image.complete) {
			draw()
		} else {
			image.addEventListener("load", draw)
		}
	}

	const stop = () => {
		canvas.current!.style.display = "none"
		target.current = null
	}

	const overlay = () => {
		if (!target.current) return
		const rect = target.current.getBoundingClientRect()

		const el = canvas.current!
		el.width = rect.width
		el.height = rect.height
		el.style.top = `${rect.top}px`
		el.style.left = `${rect.left}px`
		el.style.display = "block"
	}

	return {
		start,
		stop,
	}
}

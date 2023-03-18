import { MouseEvent } from "react"
import { GenreTag } from "./GenreList"

export default function GenreButton(props: GenreButtonProps) {
    let { genreTag, classes } = props

    if (genreTag.isSelected) {
        classes.push("is-primary")
    }
    return (<button
        value={genreTag.id}
        onClick={props.handleClick}
        className={classes.join(' ')}>{genreTag.genre.name}</button>)
}

interface GenreButtonProps {
    classes: string[],
    genreTag: GenreTag,
    handleClick(e: MouseEvent): void
}
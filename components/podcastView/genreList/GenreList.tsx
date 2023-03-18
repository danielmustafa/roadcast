import Genre from "@/models/podcast/Genre"
import { useEffect, useState, MouseEvent } from "react"
import GenreButton from "./GenreButton"
import GenreTag from "./GenreButton"

export default function GenreList(props: GenreListProps) {
    let [genreTags, setGenreTags] = useState<GenreTag[]>([])
    let DEFAULT_CLASSES = ["button", "tag", "is-medium"]

    useEffect(() => {
        let genreTags: GenreTag[] = props.genres
            .sort((a, b) => a.name.localeCompare(b.name))
            .map(genre => {
                return {
                    id: genre.id,
                    isSelected: false,
                    genre,
                }
            })
        setGenreTags(genreTags)
    }, [props.genres])

    const handleClick = (e: MouseEvent) => {
        let targetId = e.target.value
        let genreTagsCopy = [...genreTags]
        let index = genreTagsCopy.findIndex(genreTag => genreTag.id == targetId)
        let genreTag = genreTagsCopy[index]
        genreTag.isSelected = !genreTag.isSelected
        genreTagsCopy[index] = genreTag
        setGenreTags(genreTagsCopy)
    }

    return (
        <div className="box buttons">
            {genreTags
                .map(genreTag => {
                    return <GenreButton
                        key={genreTag.id}
                        genreTag={genreTag}
                        classes={[...DEFAULT_CLASSES]}
                        handleClick={handleClick}
                    />
                })
            }
        </div>
    )
}

interface GenreListProps {
    genres: Genre[]
}

export interface GenreTag {
    id: string,
    genre: Genre,
    isSelected: boolean
}
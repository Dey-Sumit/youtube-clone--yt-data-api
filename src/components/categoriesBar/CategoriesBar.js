import React from 'react'
import { useDispatch } from 'react-redux'
import { searchVideos } from '../../redux/actions/videos.action'
import './categoriesBar.scss'

const keywords = ["React", "Angular", "React Native", "use of API", "Redux", "Music", "Algorithm Art ", "Guitar", "Bengali Songs", "Coding", "Cricket", "Football", "Real Madrid"]




const CategoriesBar = () => {

    const dispatch = useDispatch()

    return (
        <div className="categories">
            <section className="category-section">
                {/* //change button to span */}
                <button className="category active">All</button>
                {keywords.map((word, i) => <button key={i} className="category"
                    onClick={() => dispatch(searchVideos(word, "video"))}>
                    {word}</button>)}
            </section>
        </div>
    )
}

export default CategoriesBar

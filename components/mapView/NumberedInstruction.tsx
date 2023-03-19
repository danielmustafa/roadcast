const NumberedInstruction = (props: NumberedInstructionProps) => {
    return (
        <div className="block is-flex is-align-items-center ">
            <div className="icon is-large has-text-primary fa-layers">
                <i className="fa fa-circle fa-3x"></i>
                <strong className="fa-layers-text has-text-light" data-fa-transform="grow-25">{props.number}</strong>
            </div>
            <p className="ml-3 has-text-light has-text-weight-medium is-size-3">{props.text}</p>
        </div>
    )
}

interface NumberedInstructionProps {
    number: number,
    text: string
}

export default NumberedInstruction


export  function UserInput({onChange}) {

    return (
        <section id="user-input">
                <div className='input-group'>
                    <p>
                    <label>Initial Investment:</label>
                    <input onChange={onChange} type="number" name="initialInvestment" required />
                    </p>

                    <p>
                    <label>Annual Investment:</label>
                    <input onChange={onChange} type="number" name="annualInvestment" required />
                    </p>
                </div>
                <div className='input-group'>
                    <p>
                        <label> Investment Duration (years):</label>
                        <input onChange={onChange} type="number" name="investmentDuration" required />
                    </p>
                    <p>
                    <label>Expected Annual Return (%):</label>
                    <input onChange={onChange} type="number" name="expectedReturn" required />
                    </p>
                </div>
        </section>
    );
}
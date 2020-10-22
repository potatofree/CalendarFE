import React from 'react';
import { Field, reduxForm } from 'redux-form';

let NewTaskForm = props => {
    const { handleSubmit, pristine, submitting } = props;
    return (
        <form onSubmit={handleSubmit}>
            <div>
                <div>
                    <label htmlFor="taskName">Task Name </label>
                    <div>
                        <Field name="taskName" component="input" type="text" />
                    </div>
                </div>
                <div>
                    <label htmlFor="taskBody">Task Description </label>
                    <div>
                        <Field name="taskBody" component="input" type="text" />
                    </div>
                </div>
                <div>
                    <label htmlFor="taskDate">Date </label>
                    <div>
                        <Field name="taskDate" component="input" type="date" />
                    </div>
                </div>
                <div>
                    <label htmlFor="taskTimeStart">Start Time </label>
                    <div>
                        <Field name="taskTimeStart" component="input" type="number" 
                        min="7" max="22"/>
                    </div>
                </div>                
                <div>
                    <label htmlFor="taskTimeEnd">End Time </label>
                    <div>
                        <Field name="taskTimeEnd" component="input" type="number" 
                        min="7" max="22"/>
                    </div>
                </div>                
                <div>
                    <button type="submit" disabled={pristine || submitting}>Submit</button>
                </div>
            </div>
        </form>
    );
};

NewTaskForm = reduxForm({
    form: 'task'
})(NewTaskForm);

export default NewTaskForm;
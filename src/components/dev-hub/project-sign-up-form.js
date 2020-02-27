import React, { useState } from 'react';
import Modal from './modal';
import styled from '@emotion/styled';
import { size } from './theme';
import { H5 } from './text';
import Input from './input';
import Button from './button';
import TextArea from './text-area';

const ModalContainer = styled('div')`
    padding: 0 ${size.default};
`;
const SubmitContainer = styled('div')`
    align-items: center;
    display: flex;
    justify-content: flex-end;
    margin-top: ${size.medium};
`;
const Title = styled(H5)`
    padding-bottom: ${size.medium};
`;
const StyledInput = styled(Input)`
    margin-bottom: ${size.large};
`;
const Form = React.memo(() => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [project, setProject] = useState('');
    const handleSubmit = e => {
        e.preventDefault();
        console.log({
            name,
            email,
            project,
        });
    };
    return (
        <form onSubmit={handleSubmit}>
            <StyledInput
                value={name}
                required
                placeholder="Name"
                onChange={e => setName(e.target.value)}
            />
            <StyledInput
                value={email}
                required
                placeholder="Email Address"
                onChange={e => setEmail(e.target.value)}
            />
            <TextArea
                value={project}
                required
                placeholder="Project Description"
                onChange={e => setProject(e.target.value)}
            />
            <SubmitContainer>
                <Button type="submit" primary>
                    Submit project
                </Button>
            </SubmitContainer>
        </form>
    );
});

export default ({ triggerComponent }) => {
    return (
        <Modal
            dialogContainerStyle={{
                width: '800px',
            }}
            dialogMobileContainerStyle={{
                width: '100%',
            }}
            triggerComponent={triggerComponent}
        >
            <ModalContainer>
                <Title>Submit Your Project</Title>
                <Form />
            </ModalContainer>
        </Modal>
    );
};
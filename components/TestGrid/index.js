import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

import css from './styles.module.scss';

const COLUMN_COUNT = 12

const TestGrid = () => {
    const columns = []

    if (process?.env.NODE_ENV !== 'development') {
        return null;
    }

    for (let i = 0; i < COLUMN_COUNT; i++) {
    columns.push(<Col><div className={css.inner}></div></Col>)
    }

    return (
        <Container className={css.container}>
            <Row className={css.testRow}>
                {columns}
            </Row>
        </Container>
    );
};

export default TestGrid;
import _get from 'lodash/get';
import styled from '@emotion/styled';
import moment from 'moment'
import axios from 'axios';
import { useState, useEffect, useCallback, memo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Table, Column, HeaderCell, Cell } from 'rsuite-table';
import { Container, Button, Form } from 'react-bootstrap';

import { debounce } from 'utils/debounce'
import { storeUser } from 'store/actions/user'
import { GENDERS } from 'constants/gender'
import { Breadcrumb, PageHeader, theme } from 'components/themes/v1'
import { SinglePagination } from 'components/common'

const Section = styled.div`
  width: 100%;
  margin-bottom: 1rem;
`

const Content = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 1rem;
  padding: 0.5rem 0;
  width: ${props => props.width ? props.width : 100 }%;

  &.middle {
    align-items: center;
  }

  @media (max-width: ${theme.breakpoint.md}) {
    width: 100%;
  }
`

const ContentItem = styled.div`
  flex: 1 1 auto;
`

const Home = (props) => {
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState({
    page: 1,
    keyword: '',
    gender: '',
    sort_by: '',
    order: 'desc',
  });

  const [queryParams, setQueryParams] = useState({
    page: 1,
    results: 10,
    keyword: '',
    gender: '',
    sort_by: '',
    order: 'desc',
  });

  const userData = useSelector(state => state.user.data)

  const { t } = useTranslation();
  const dispatch = useDispatch();

  const onResetFilter = () => {
    if (!!filter.keyword || !!filter.gender) {
      setFilter(prev => ({ ...prev, keyword: '', gender: '' }))
      debounceSearch({ keyword: '', gender: '' })
    }
  }

  const onSearch = async (data) => {
    setQueryParams((prev) => ({ ...prev, ...data }));
  };

  const debounceSearch = useCallback(debounce(onSearch, 350), []);

  useEffect(() => {
    // add cancel request to prevent incomplete API request stacked
    const controller = new AbortController();
    const signal = controller.signal;

    (async () => {
      setLoading(true)
      const resp = await axios.get(process.env.REACT_APP_API_URL, { params: queryParams, signal });
      setLoading(false)
  
      const data = _get(resp, 'data.results') || [];
      dispatch(storeUser({ data }));
    })()

    return () => {
      controller.abort();
      debounceSearch.cancel();
    }
  }, [queryParams])

  return (
    <Container className='main-container'>
      <Breadcrumb />

      <PageHeader>{t('page_title.search_user')}</PageHeader>

      <Section>
        <Content width='50'>
          <ContentItem>
            <Form.Control
              type='text'
              data-testid='input-search'
              placeholder={t('form.search')}
              value={filter.keyword}
              onChange={e => {
                setFilter(prev => ({ ...prev, keyword: e.target.value }))
                debounceSearch({ keyword: e.target.value })
              }}
            />
          </ContentItem>

          <ContentItem className='ml-2'>
            <Form.Control
              as='select'
              data-testid='input-gender'
              value={filter.gender}
              onChange={(e) => {
                setFilter(prev => ({ ...prev, gender: e.target.value }))
                debounceSearch({ gender: e.target.value })
              }}
            >
              <option value='' data-testid='select-option'>{t('form.gender')}</option>
        
              {GENDERS.map((val, idx) => (
                <option data-testid='select-option' key={`genderOpt${idx}`} value={val.value}>
                  {t(val.title)}
                </option>
              ))}
            </Form.Control>
          </ContentItem>

          <ContentItem className='ml-2'>
            <Button
              type='button'
              data-testid='reset-filter'
              variant='outline-primary'
              onClick={onResetFilter}
            >{t('button.reset_filter')}</Button>
          </ContentItem>
        </Content>
      </Section>

      <Section>
        <Content>
          <ContentItem>
            <Table
              data={userData}
              wordWrap
              autoHeight
              loading={loading}
              sortColumn={filter.sort_by}
              sortType={filter.order}
              onSortColumn={(sortColumn, sortType) => {
                const params = { sort_by: sortColumn, order: sortType }
                setFilter(prev => ({ ...prev, ...params }))
                debounceSearch(params)
              }}
            >
              <Column flexGrow={1} minWidth={100} verticalAlign='middle' sortable>
                <HeaderCell>{t('username')}</HeaderCell>
                <Cell dataKey="username">
                  {(rowData, rowIndex) => {
                    const field = _get(rowData, 'login.username') || ''
                    return field
                  }}
                </Cell>
              </Column>

              <Column flexGrow={1} minWidth={100} verticalAlign='middle' sortable>
                <HeaderCell>{t('name')}</HeaderCell>
                <Cell dataKey="name">
                  {(rowData, rowIndex) => {
                    const firstName = _get(rowData, 'name.first') || ''
                    const lastName = _get(rowData, 'name.last') || ''
                    const title = _get(rowData, 'name.title') || ''
                    return [title, firstName, lastName].join(" ")
                  }}
                </Cell>
              </Column>

              <Column flexGrow={1} minWidth={100} verticalAlign='middle' sortable>
                <HeaderCell>{t('email')}</HeaderCell>
                <Cell dataKey="email">
                  {(rowData, rowIndex) => {
                    const field = _get(rowData, 'email') || ''
                    return field
                  }}
                </Cell>
              </Column>

              <Column flexGrow={1} minWidth={100} verticalAlign='middle' sortable>
                <HeaderCell>{t('gender')}</HeaderCell>
                <Cell dataKey="gender">
                  {(rowData, rowIndex) => {
                    const field = _get(rowData, 'gender') || ''
                    return t(`form.${field}`)
                  }}
                </Cell>
              </Column>

              <Column flexGrow={1} minWidth={100} verticalAlign='middle' sortable>
                <HeaderCell>{t('registered_date')}</HeaderCell>
                <Cell dataKey="registered_date">
                  {(rowData, rowIndex) => {
                    const field = _get(rowData, 'registered.date') || ''
                    return field ? moment(new Date(field)).format('YYYY-MM-DD') : ''
                  }}
                </Cell>
              </Column>
            </Table>
          </ContentItem>
        </Content>
      </Section>

      <Section>
        <Content className='middle'>
          <ContentItem>
            {t('page')} <span data-testid='current-page'>{filter.page}</span> {`${t('from')} 100`}
          </ContentItem>

          <ContentItem className='text-right'>
            <SinglePagination
              current_page={queryParams.page}
              total_page={100}
              onChange={page => {
                setFilter(prev => ({ ...prev, page }))
                debounceSearch({ page })
              }}
            />
          </ContentItem>
        </Content>
      </Section>
    </Container>
  );
};

export default Home;

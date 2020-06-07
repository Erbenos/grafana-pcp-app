import React from 'react';
import { VerticalGroup, Input, Icon, Button, HorizontalGroup, Checkbox, Field } from '@grafana/ui';
import { connect } from 'react-redux';

import { SearchContainer, SearchSubmitBtn, SearchFormGroup, SearchBlock } from './styles';
import { querySearch } from '../../actions/search';
import { RootState } from '../../reducers';
import { SearchEntity } from '../../actions/types';

const mapStateToProps = (state: RootState) => ({
  query: state.search.query,
  bookmarks: state.search.bookmarks,
});

const dispatchProps = {
  querySearch,
};

type SearchFormProps = ReturnType<typeof mapStateToProps> & typeof dispatchProps;

interface SearchFormState {
  inputTouched: boolean,
  query: {
    pattern: string,
    entityFlags: SearchEntity,
  },
};

class SearchForm extends React.Component<SearchFormProps, SearchFormState> {
  state: SearchFormState = this.initialState;

  get initialState() {
    return {
      inputTouched: false,
      query: {
        pattern: '',
        entityFlags: SearchEntity.All,
      },
    };
  }

  constructor(props: SearchFormProps) {
    super(props);
    if (props.query) {
      this.setState({ query: props.query });
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.setEntityFlag = this.setEntityFlag.bind(this);
  }

  componentWillReceiveProps(props: SearchFormProps) {
    this.setState({ query: props.query, inputTouched: false });
  }

  handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const submitForm = (() => {
      if (!(this.state.inputTouched && this.isValidInput)) {
        return;
      }
      this.props.querySearch({ ...this.state.query, pageNum: 1 });
    });
    if (this.state.inputTouched) {
      submitForm();
    } else {
      this.setState({ inputTouched: true }, () => {
        submitForm();
      });
    }
  }

  handleInputChange(e: React.FormEvent<HTMLInputElement>) {
    this.setState({ inputTouched: true });
    this.setState({
      query: {
        ...this.state.query,
        pattern: e.currentTarget.value,
      },
    });
  }

  get metricFlag(): boolean {
    return (this.state.query.entityFlags & 1 << 0) > 0;
  }

  get instanceDomainsFlag(): boolean {
    return (this.state.query.entityFlags & 1 << 1) > 0;
  }

  get instancesFlag(): boolean {
    return (this.state.query.entityFlags & 1 << 2) > 0;
  }

  get isValidInput(): boolean {
    return this.state.query.pattern.trim() !== '';
  }

  get isTouchedInput(): boolean {
    return this.state.inputTouched;
  }

  setEntityFlag(entity: SearchEntity) {
    this.setState({
      query: {
        ...this.state.query,
        entityFlags: this.state.query.entityFlags ^ entity,
      },
    });
  }

  render() {
    const { 
      handleSubmit, handleInputChange, state,
      metricFlag, instancesFlag, instanceDomainsFlag,
      setEntityFlag, isValidInput, isTouchedInput
    } = this;
    const { pattern } = state.query;
    return (
      <form className={SearchContainer} onSubmit={handleSubmit}>
        <VerticalGroup spacing="sm">
          <div className={SearchFormGroup}>
            <Field
              className={SearchBlock}
              invalid={!isValidInput && isTouchedInput}
              error={!isValidInput && isTouchedInput ? 'This input is required' : ''}>
              <Input
                prefix={<Icon name="search" />}
                value={pattern}
                onChange={handleInputChange}
                placeholder="Search Phrase"/>
            </Field>
            <Button
              className={SearchSubmitBtn}
              variant="primary"
              size="md"
              type="submit">
              Search
            </Button>
          </div>
          <div className={SearchFormGroup}>
            <HorizontalGroup spacing="lg">
              <Checkbox
                value={metricFlag}
                onChange={() => setEntityFlag(SearchEntity.Metrics)}
                label="Metrics"
              />
              <Checkbox
                value={instancesFlag}
                onChange={() => setEntityFlag(SearchEntity.Instances)}
                label="Instances"
              />
              <Checkbox
                value={instanceDomainsFlag}
                onChange={() => setEntityFlag(SearchEntity.InstanceDomains)}
                label="Instance Domains"
              />
            </HorizontalGroup>
          </div>
        </VerticalGroup>
      </form>
    );
  }
}

export default connect(
  mapStateToProps,
  { querySearch }
)(SearchForm);
export { SearchEntity, SearchFormProps };

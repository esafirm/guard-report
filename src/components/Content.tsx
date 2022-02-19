import { View } from 'react-native';
import Header from './Header';
import ClassContent from './content/ClassContent';
import PackageContent from './content/PackageContent';
import SymbolContent from './content/SymbolContent';

import { useState } from 'react';
interface ContentProps {
  filter: string;
  tagFilter: string[];
}

interface ContentState {
  currentPackage?: string;
  currentClass?: string;
}

function getHeader(
  state: ContentState,
  setState: (state: ContentState) => void
) {
  if (state.currentClass) {
    return (
      <Header
        header={state.currentClass}
        onBackPressed={() => {
          setState({
            currentPackage: state.currentPackage,
          });
        }}
      />
    );
  }
  if (state.currentPackage) {
    return (
      <Header
        header={state.currentPackage}
        onBackPressed={() => {
          setState({});
        }}
      />
    );
  }

  return <Header header={'Package Name'} />;
}

function getContent(
  props: ContentProps,
  state: ContentState,
  setState: (state: ContentState) => void
) {
  if (state.currentClass && state.currentPackage) {
    return (
      <SymbolContent
        filter={props.filter}
        packageName={state.currentPackage}
        className={state.currentClass}
      />
    );
  }

  if (state.currentPackage) {
    return (
      <ClassContent
        filter={props.filter}
        tagFilter={props.tagFilter}
        packageName={state.currentPackage}
        onClassSelected={(selectedClass) => {
          setState({
            currentClass: selectedClass,
            currentPackage: state.currentPackage,
          });
        }}
      />
    );
  }

  return (
    <PackageContent
      filter={props.filter}
      tagFilter={props.tagFilter}
      onPackageSelected={(selected) => {
        setState({
          currentPackage: selected,
        });
      }}
    />
  );
}

export default function Content(props: ContentProps) {
  const [state, setState] = useState<ContentState>({});

  return (
    <View
      style={{
        flex: 1,
        borderColor: 'black',
        borderWidth: 1,
      }}
    >
      {getHeader(state, setState)}
      {getContent(props, state, setState)}
    </View>
  );
}

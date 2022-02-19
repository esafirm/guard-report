import { View, FlatList } from 'react-native';
import PackageListItem from './listitem/PackageListItem';
import ClassListItem from './listitem/ClassListItem';
import Header from './Header';

import { getDataArray, getPackageArray } from '../datahandler';
import { useState } from 'react';
interface ContentProps {
  filter: string;
}

interface ContentState {
  currentPackage?: string;
  currentClass?: string;
}

interface PackageContentProps {
  filter: string;
  onPackageSelected: (packageName: string) => void;
}

function PackageContent(props: PackageContentProps) {
  const packages = Object.keys(getPackageArray()).filter((item) =>
    item.includes(props.filter)
  );

  return (
    <FlatList
      data={packages}
      renderItem={(listItem) => (
        <PackageListItem
          packageName={listItem.item}
          onPackagePressed={props.onPackageSelected}
        />
      )}
    />
  );
}

interface ClassContentProps {
  filter: string;
  packageName: string;
  onClassSelected: (className: string) => void;
}

function ClassContent(props: ClassContentProps) {
  const classes = getPackageArray()[props.packageName].filter((item) =>
    item.parent.includes(props.filter)
  );

  return (
    <FlatList
      data={classes}
      renderItem={(listItem) => <ClassListItem item={listItem.item} />}
    />
  );
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
  if (state.currentPackage) {
    return (
      <ClassContent
        filter={props.filter}
        packageName={state.currentPackage}
        onClassSelected={() => {}}
      />
    );
  }

  return (
    <PackageContent
      filter={props.filter}
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

  const items = getDataArray().filter((item) =>
    item.parent.startsWith(props.filter)
  );

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

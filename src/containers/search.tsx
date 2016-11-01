import * as React from 'react'
import { connect, Dispatch } from 'react-redux'
import {
  View,
  ViewStyle,
  Text,
  StyleSheet
} from 'react-native'
import { ISearchQuery, startSearch } from '../actions'
import {
  Form
} from '../components/base'
import {
  IRouterProps
} from '../interfaces'
import * as api from '../services/api'
import TabBar from '../components/homeNavBar'
import PlayList from './search/playlist'

const { SearchType } = api
const ScrollableTabView = require('react-native-scrollable-tab-view') // tslint:disable-line


interface IProps extends IRouterProps {
  startSearch: ISearchQuery
}

class Search extends React.Component<IProps, { query: string }> {
  constructor (props: IProps) {
    super(props)
    this.state = {
      query: ''
    }
  }

  componentDidMount() {
    api.search('周杰伦', SearchType.playList).then(res => {
      console.log(res)
    })
  }

  render () {
    return <View>
      <View style={styles.container}>
        <View style={styles.formContainer}>
        <Form
          icon='search'
          placeholder='搜索歌单，单曲，专辑，艺人'
          autoFocus={true}
          onClear={this.clearQuery}
          onChangeText={this.changeQuery}
          value={this.state.query}
          containerStyle={{paddingBottom: 0, paddingTop: 0}}
          onSubmitEditing={this.startSearching}
        />
        </View>
        <View style={styles.cancel}>
          <Text style={{fontSize: 14}} onPress={this.back}>取消</Text>
        </View>
      </View>
      <ScrollableTabView
        renderTabBar={this.renderTabBar()}
      >
        <View tabLabel='单曲'></View>
        <View tabLabel='专辑'></View>
        <View tabLabel='艺人'></View>
      </ScrollableTabView>
    </View>
  }

  private changeQuery = (query: string) => {
    this.setState({ query })
  }

  private clearQuery = () => {
    this.setState({ query : ''})
  }

  private back = () => {
    this.props.router && this.props.router.pop() // tslint:disable-line
  }

  private startSearching = () => {
    this.props.startSearch(this.state.query)
  }

  private renderTabBar = () => {
    return () => <TabBar {...this.props} showIcon={false}/>
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    height: 40,
    flexDirection: 'row',
    borderWidth: StyleSheet.hairlineWidth,
    borderTopWidth: 0,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    borderColor: '#ccc'
  } as ViewStyle,
  formContainer: {
    flex: 1,
    justifyContent: 'center'
  } as ViewStyle,
  cancel: {
    height: 40,
    alignItems: 'flex-end',
    marginRight: 10,
    justifyContent: 'center'
  } as ViewStyle
})

export default connect(
  () => ({}),
  (dispatch: Dispatch<Redux.Action>) => ({
    startSearch(query: string) {
      return dispatch(startSearch(query))
    }
  })
)(Search)
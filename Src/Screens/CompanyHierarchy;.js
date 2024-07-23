import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const UserChart = () => {
  const [selectedNode, setSelectedNode] = useState(null);

  const handlePress = (node) => {
    setSelectedNode(node);
  };

  const renderNode = (title, role, node) => (
    <TouchableOpacity
      style={[
        styles.nodeContainer,
        selectedNode === node && styles.selectedNodeContainer,
      ]}
      onPress={() => handlePress(node)}
    >
      <Text style={styles.nodeTitle}>{title}</Text>
      <Text style={styles.nodeRole}>{role}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.bottom}>
        {renderNode('Admin', 'admin', 'admin')}
        <View style={styles.lineVertical} />
        <View style={styles.row}>
          <View style={styles.nodeWrapper}>
            <View style={styles.lineVerticalShort} />
            {renderNode('GM', 'team_manager', 'gm')}
            <View style={styles.lineVertical} />
            {renderNode('TC1', 'salesman', 'tc1')}
          </View>
          <View style={styles.lineHorizontal} />
          <View style={styles.nodeWrapper}>
            <View style={styles.lineVerticalShort} />
            {renderNode('SM1', 'team_manager', 'sm1')}
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 0.9,
    backgroundColor: '#fff',
  },
  bottom: {
    margin: 10,
    backgroundColor: '#e6e8eb',
    height: '96%',
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  nodeContainer: {
    alignItems: 'center',
    marginVertical: 10,
    padding: 10,
    backgroundColor: '#b5d9ea',
    borderRadius: 5,
    elevation: 3,
  },
  selectedNodeContainer: {
    backgroundColor: '#ffa500',
  },
  nodeTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  nodeRole: {
    fontSize: 14,
    color: 'green',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    alignItems: 'flex-start',
  },
  lineVertical: {
    width: 2,
    height: 30,
    backgroundColor: 'gray',
  },
  lineVerticalShort: {
    width: 2,
    height: 15,
    backgroundColor: 'gray',
  },
  lineHorizontal: {
    width: '40%',
    height: 2,
    backgroundColor: 'gray',
  },
  nodeWrapper: {
    alignItems: 'center',
  },
});

const CompanyHierarchy = () => {
  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      <View style={{ padding: 10, backgroundColor: '#e0e0e0' }}>
        <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Users Chart</Text>
      </View>
      <UserChart />
    </View>
  );
};

export default CompanyHierarchy;
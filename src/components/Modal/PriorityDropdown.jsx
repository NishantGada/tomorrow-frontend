import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList } from 'react-native';

export default function PriorityDropdown({ selected, setSelected }) {
  // const [selected, setSelected] = useState('Select priority');
  const [isOpen, setIsOpen] = useState(false);

  const options = ['high', 'medium', 'low'];

  const handleSelect = (option) => {
    console.log(option);
    setSelected(option);
    setIsOpen(false);
  };

  return (
    <View style={styles.container}>
      {/* Dropdown Header */}
      <TouchableOpacity
        style={styles.dropdownHeader}
        onPress={() => setIsOpen(!isOpen)}
        activeOpacity={0.7}
      >
        <Text style={styles.dropdownText}>{selected}</Text>
        <Text style={styles.arrow}>{isOpen ? '▲' : '▼'}</Text>
      </TouchableOpacity>

      {/* Dropdown Options */}
      {isOpen && (
        <View style={styles.dropdownList}>
          <FlatList
            data={options}
            keyExtractor={(item) => item}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.dropdownItem}
                onPress={() => handleSelect(item)}
              >
                <Text style={styles.dropdownItemText}>{item}</Text>
              </TouchableOpacity>
            )}
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignSelf: 'center',
  },
  dropdownHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    // padding: 12,
    padding: 20,
    borderWidth: 1.5,
    borderColor: 'black',
    borderRadius: 8,
    backgroundColor: '#fff',
  },
  dropdownText: {
    fontSize: 16,
    color: '#333',
  },
  arrow: {
    fontSize: 16,
    color: '#333',
  },
  dropdownList: {
    marginTop: 4,
    borderWidth: 1.5,
    borderColor: '#aaa',
    borderRadius: 8,
    backgroundColor: '#fff',
    overflow: 'hidden',
  },
  dropdownItem: {
    padding: 12,
  },
  dropdownItemText: {
    fontSize: 16,
    color: '#333',
  },
});

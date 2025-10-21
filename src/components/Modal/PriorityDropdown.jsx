import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function PriorityDropdown({ selected, setSelected, disabled = false }) {
  const [isOpen, setIsOpen] = useState(false);
  const options = ['high', 'medium', 'low'];

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high':
        return '#f08080';
      case 'medium':
        return '#ffeb99';
      case 'low':
        return '#d4f4dd';
      default:
        return '#E5E7EB';
    }
  };

  const getPriorityIcon = (priority) => {
    switch (priority) {
      case 'high':
        return 'alert-circle';
      case 'medium':
        return 'ellipse';
      case 'low':
        return 'checkmark-circle';
      default:
        return 'help-circle';
    }
  };

  const handleSelect = (option) => {
    setSelected(option);
    setIsOpen(false);
  };

  return (
    <View style={styles.container}>
      {/* Dropdown Header */}
      <TouchableOpacity
        style={[styles.dropdownHeader, isOpen && styles.dropdownHeaderOpen]}
        onPress={() => !disabled && setIsOpen(!isOpen)}
        activeOpacity={0.7}
        disabled={disabled}
      >
        <View style={styles.headerContent}>
          <View
            style={[
              styles.priorityDot,
              { backgroundColor: getPriorityColor(selected) },
            ]}
          />
          <Text style={styles.dropdownText}>
            {selected.charAt(0).toUpperCase() + selected.slice(1)}
          </Text>
        </View>
        <Ionicons
          name={isOpen ? 'chevron-up' : 'chevron-down'}
          size={20}
          color="#6B7280"
        />
      </TouchableOpacity>

      {/* Dropdown Options */}
      {isOpen && (
        <View style={styles.dropdownList}>
          <FlatList
            data={options}
            keyExtractor={(item) => item}
            scrollEnabled={false}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={[
                  styles.dropdownItem,
                  selected === item && styles.dropdownItemSelected,
                ]}
                onPress={() => handleSelect(item)}
                activeOpacity={0.6}
              >
                <View
                  style={[
                    styles.itemDot,
                    { backgroundColor: getPriorityColor(item) },
                  ]}
                />
                <Text
                  style={[
                    styles.dropdownItemText,
                    selected === item && styles.dropdownItemTextSelected,
                  ]}
                >
                  {item.charAt(0).toUpperCase() + item.slice(1)}
                </Text>
                {selected === item && (
                  <Ionicons name="checkmark" size={18} color="#3B82F6" />
                )}
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
  },
  dropdownHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 12,
    borderWidth: 1.5,
    borderColor: '#E5E7EB',
    borderRadius: 10,
    backgroundColor: '#FAFAFA',
  },
  dropdownHeaderOpen: {
    borderColor: '#3B82F6',
    backgroundColor: '#F0F4FF',
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  priorityDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  dropdownText: {
    fontSize: 15,
    color: '#111827',
    fontWeight: '500',
  },
  dropdownList: {
    marginTop: 8,
    borderWidth: 1.5,
    borderColor: '#E5E7EB',
    borderRadius: 10,
    backgroundColor: '#fff',
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  dropdownItem: {
    paddingHorizontal: 12,
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  dropdownItemSelected: {
    backgroundColor: '#F0F4FF',
  },
  itemDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  dropdownItemText: {
    fontSize: 15,
    color: '#666',
    fontWeight: '500',
    flex: 1,
  },
  dropdownItemTextSelected: {
    color: '#111827',
    fontWeight: '600',
  },
});
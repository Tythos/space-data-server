// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

contract TrustMapping {
    struct Relationship {
        uint listPointer;
        uint8 trustLevel;
    }

    mapping(address => mapping(address => Relationship)) private _trustMap;

    mapping(address => address[]) private _secondaryKeys;

    function setTrust(address _trustedParty, uint8 _trustLevel) public {
        if (_trustLevel == 0) {
            delete _trustMap[msg.sender][_trustedParty];
            removeSecondaryKey(msg.sender, _trustedParty);
        } else {
            bool addSecondary = false;
            if (_trustMap[msg.sender][_trustedParty].listPointer == 0) {
                addSecondary = true;
            }
            if (addSecondary) {
                _trustMap[msg.sender][_trustedParty] = Relationship({
                    listPointer: _secondaryKeys[msg.sender].length + 1,
                    trustLevel: _trustLevel
                });
                _secondaryKeys[msg.sender].push(_trustedParty);
            } else {
                _trustMap[msg.sender][_trustedParty].trustLevel = _trustLevel;
            }
        }
    }

    function getCount(address _main) public view returns (uint) {
        return _secondaryKeys[_main].length;
    }

    function getRelationships(
        address _main
    ) public view returns (address[] memory) {
        return _secondaryKeys[_main];
    }

    function getTrust(
        address _main,
        address _trustedParty
    ) public view returns (uint8) {
        return _trustMap[_main][_trustedParty].trustLevel;
    }

    function removeSecondaryKey(address _main, address _secondaryKey) private {
        if (_trustMap[_main][_secondaryKey].listPointer > 0) {
            uint256 index = _trustMap[_main][_secondaryKey].listPointer - 1;
            if (index < _secondaryKeys[_main].length) {
                // update the list pointer of the swapped element
                _trustMap[_main][
                    _secondaryKeys[_main][_secondaryKeys[_main].length - 1]
                ].listPointer = index + 1;

                // swap the element to be removed with the last element
                _secondaryKeys[_main][index] = _secondaryKeys[_main][
                    _secondaryKeys[_main].length - 1
                ];

                // remove the last element
                _secondaryKeys[_main].pop();

                // delete the relationship in _trustMap
                delete _trustMap[_main][_secondaryKey];
            }
        }
    }

    function findSecondaryKeyIndex(
        address _main,
        address _secondaryKey
    ) private view returns (uint256) {
        for (uint256 i = 0; i < _secondaryKeys[_main].length; i++) {
            if (_secondaryKeys[_main][i] == _secondaryKey) {
                return i;
            }
        }
        return _secondaryKeys[_main].length;
    }
}

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View, TouchableOpacity, ActivityIndicator } from 'react-native';
import { colors } from '../../../../styles/common';
import { strings } from '../../../../../locales/i18n';
import Summary from '../../../Base/Summary';
import Text from '../../../Base/Text';

const styles = StyleSheet.create({
	overview: {
		marginHorizontal: 24
	},
	loader: {
		backgroundColor: colors.white,
		height: 10
	},
	over: {
		color: colors.red
	}
});

/**
 * PureComponent that displays a transaction's fee and total details inside a card
 */
class TransactionReviewFeeCard extends PureComponent {
	static propTypes = {
		/**
		 * True if gas estimation for a transaction is complete
		 */
		gasEstimationReady: PropTypes.bool,
		/**
		 * Total gas fee in fiat
		 */
		totalGasFiat: PropTypes.string,
		/**
		 * Total gas fee in ETH
		 */
		totalGasEth: PropTypes.string,
		/**
		 * Total transaction value in fiat
		 */
		totalFiat: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node, PropTypes.string]),
		/**
		 * Transaction value in fiat before gas fee
		 */
		fiat: PropTypes.string,
		/**
		 * Total transaction value in ETH
		 */
		totalValue: PropTypes.object,
		/**
		 * Transaction value in ETH before gas fee
		 */
		transactionValue: PropTypes.string,
		/**
		 * ETH or fiat, dependent on user setting
		 */
		primaryCurrency: PropTypes.string,
		/**
		 * Changes mode to edit
		 */
		edit: PropTypes.func,
		/**
		 * True if transaction is over the available funds
		 */
		over: PropTypes.bool,
		/**
		 * True if transaction is gas price is higher than the "FAST" value
		 */
		warningGasPriceHigh: PropTypes.string
	};

	renderIfGasEstimationReady = children => {
		const { gasEstimationReady } = this.props;
		return !gasEstimationReady ? (
			<View style={styles.loader}>
				<ActivityIndicator size="small" />
			</View>
		) : (
			children
		);
	};

	render() {
		const {
			totalGasFiat,
			totalGasEth,
			totalFiat,
			fiat,
			totalValue,
			transactionValue,
			primaryCurrency,
			gasEstimationReady,
			edit,
			over,
			warningGasPriceHigh
		} = this.props;
		let amount;
		let networkFee;
		let totalAmount;
		let equivalentTotalAmount;
		if (primaryCurrency === 'ETH') {
			amount = transactionValue;
			networkFee = totalGasEth;
			totalAmount = totalValue;
			equivalentTotalAmount = totalFiat;
		} else {
			amount = fiat;
			networkFee = totalGasFiat;
			totalAmount = totalFiat;
			equivalentTotalAmount = totalValue;
		}
		return (
			<Summary style={styles.overview}>
				<Summary.Row>
					<Text primary bold>
						{strings('transaction.amount')}
					</Text>
					<Text primary bold upper>
						{amount}
					</Text>
				</Summary.Row>
				<Summary.Row>
					<Summary.Col>
						<Text primary bold>
							{strings('transaction.gas_fee')}
						</Text>
						<TouchableOpacity onPress={edit} disabled={!gasEstimationReady}>
							<Text link bold>
								{'  '}
								{strings('transaction.edit')}
							</Text>
						</TouchableOpacity>
					</Summary.Col>
					{this.renderIfGasEstimationReady(
						<Text primary bold upper style={warningGasPriceHigh ? styles.over : styles.primary}>
							{networkFee}
						</Text>
					)}
				</Summary.Row>
				<Summary.Separator />
				<Summary.Row>
					<Text primary bold style={(over && styles.over) || null}>
						{strings('transaction.total')} {strings('transaction.amount')}
					</Text>
					{!!totalFiat && this.renderIfGasEstimationReady(totalAmount)}
				</Summary.Row>
				<Summary.Row end last>
					{this.renderIfGasEstimationReady(<Text bold>{equivalentTotalAmount}</Text>)}
				</Summary.Row>
			</Summary>
		);
	}
}

export default TransactionReviewFeeCard;

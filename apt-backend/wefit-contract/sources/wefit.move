module wefit::wefit {
    use aptos_framework::coin as Coin;
	use aptos_std::event;
	use std::signer;
    use std::string::String;

	const COIN_NOT_REGISTERED: u64 = 1;
	const CHALLENGE_ALREADY_MOVED: u64 = 2;
	const USER_NOT_DEPOSITED: u64 = 3;
	const BALANCE_NOT_ENOUGHT: u64 = 4;
	const CHALLENGE_PAUSED: u64 = 5;
	const INVALID_ADMIN: u64 = 6;

	struct WEFIT {}

	struct Challenge has key {
		challenge_id: Coin::Coin<WEFIT>,
		paused: bool,
        active: bool,
	}

	struct UserInfo has key {
		amount: u64,
		// amount_change_events: event::EventHandle<AmountWithdrawDepositEvent>
	}

	struct AmountWithdrawDepositEvent has drop, store {
		from_amount: u64,
		to_amount: u64
	}

	public entry fun init_challenge(admin: &signer) {
		let addr = signer::address_of(admin);		

		assert!(!exists<Challenge>(addr), CHALLENGE_ALREADY_MOVED);

		let challenge_id = Coin::zero<WEFIT>();
		move_to(admin, Challenge {
			challenge_id,
			paused: false,
            active: true
		});
	}

	public entry fun pause_challenge(admin: &signer) acquires Challenge {
		let addr = signer::address_of(admin);
		assert!(exists<Challenge>(addr), INVALID_ADMIN);
		let old_challenge_holder = borrow_global_mut<Challenge>(addr);
		old_challenge_holder.paused = true;
	}

	public entry fun unpause_challenge(admin: &signer) acquires Challenge {
		let addr = signer::address_of(admin);
		assert!(exists<Challenge>(addr), INVALID_ADMIN);
		let old_challenge_holder = borrow_global_mut<Challenge>(addr);
		old_challenge_holder.paused = false;
	}

	public entry fun register(user: &signer, amount: u64, challenge_account: String) acquires  UserInfo{
		let addr = signer::address_of(user);
		if (!exists<UserInfo>(addr)) {
			move_to(user, UserInfo {
				amount: (copy amount),
				// amount_change_events: event::new_event_handle<AmountWithdrawDepositEvent>(copy user),
			});
		} else {
			let old_info = borrow_global_mut<UserInfo>(addr);
			let from_amount = *&old_info.amount;
			// event::emit_event(&mut old_info.amount_change_events, AmountWithdrawDepositEvent {
			// 	from_amount,
			// 	to_amount: from_amount + (copy amount),
			// });
			old_info.amount = old_info.amount + (copy amount);
		};
		// let coin = Coin::withdraw<WEFIT>(user, amount);
		// let challenge_holder = borrow_global_mut<Challenge>(challenge_account);
		// Coin::merge<WEFIT>(&mut challenge_holder.challenge, coin);
	}

	public entry fun claim(user: &signer, amount: u64,challenge_account: String) acquires Challenge, UserInfo {
		let addr = signer::address_of(user);

		let current_info = borrow_global_mut<UserInfo>(addr);
		let current_amount = *&current_info.amount;
		assert!(current_amount >= amount, BALANCE_NOT_ENOUGHT);

		// event::emit_event(&mut current_info.amount_change_events, AmountWithdrawDepositEvent {
		// 	from_amount: current_amount,
		// 	to_amount: current_amount - (copy amount),
		// });
		current_info.amount = current_info.amount - (copy amount);

		let challenge_holder = borrow_global_mut<Challenge>(addr);
	}
}